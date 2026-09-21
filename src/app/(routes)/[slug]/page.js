import { notFound } from "next/navigation";
import ClientCourseSections from "@/components/CoursesComponents/ClientCourseSections";
import {
  generateDynamicMetadata,
  generateDynamicJsonLd,
} from "@/lib/dynamicSEO";
import {
  coursesData,
  citiesData,
  getHeaderForCity,
  getWhyForCity,
  getWhatYouWillLearnForCity,
  getSkillsForCity,
  getWhoThisIsForForCity,
  getCertificateForCity,
  getDemoBannerForCity
} from "@/lib/masterData";
import CityLinks from "@/components/CityLinks";

export const revalidate = 86400;
export const dynamic = "force-static";

// ✅ ADDED: alias map to resolve new URL slugs to masterData keys
const COURSE_SLUG_ALIASES = {
  "data-science-with-ai": "data-science",
  "advanced-data-analytics-with-generative-ai": "data-analytics",
  "advanced-data-analytics-azure-power-bi": "data-analytics",
  "python-with-ai": "python",
  "data-visualization-with-ai": "data-visualization",
  "full-stack-with-ai": "full-stack",
  "hr-courses-training-institute": "hr-training",
  "agentic-ai": "agentic-ai",
};

const PREFERRED_CITY_LINK_SLUGS = {
  "data-science": "data-science-with-ai",
  "python": "python-with-ai",
  "data-visualization": "data-visualization-with-ai",
};

export async function generateStaticParams() {
  const params = [];
  for (const courseSlug of Object.keys(coursesData)) {
    for (const citySlug of Object.keys(citiesData)) {
      params.push({ slug: `${courseSlug}-course-in-${citySlug}` });
    }
  }

  // ✅ ADDED: pre-build aliased URLs
  const aliasedSlugs = Object.keys(COURSE_SLUG_ALIASES);
  for (const aliasSlug of aliasedSlugs) {
    for (const citySlug of Object.keys(citiesData)) {
      params.push({ slug: `${aliasSlug}-course-in-${citySlug}` });
    }
  }

  return params;
}

function parseSlug(slug) {
  const lastInIndex = slug.lastIndexOf("-in-");
  if (lastInIndex === -1) return null;

  let coursePart = slug.substring(0, lastInIndex);
  coursePart = coursePart.replace(
    /-courses$|-course$|-training$|-developer$|-developer-course$|-developer-training$|-classes$|-certification$/,
    ""
  );

  const cityPart = slug.substring(lastInIndex + 4);
  return { courseSlug: coursePart, citySlug: cityPart };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    console.warn("❌ generateMetadata: Missing slug parameter.");
    return {};
  }

  const parsed = parseSlug(slug);
  if (!parsed) {
    console.warn(
      `❌ generateMetadata: Slug "${slug}" does not match expected pattern.`
    );
    return {};
  }

  // ✅ CHANGED: resolve alias before lookup
  const { courseSlug: rawCourseSlug, citySlug } = parsed;
  const courseSlug = COURSE_SLUG_ALIASES[rawCourseSlug] || rawCourseSlug;

  if (!coursesData[courseSlug] || !citiesData[citySlug]) {
    console.warn(
      `❌ generateMetadata: Course "${courseSlug}" or City "${citySlug}" not found. Returning empty metadata.`
    );
    return {};
  }

  const metadata = generateDynamicMetadata(courseSlug, citySlug);
  if (!metadata) {
    console.warn(
      `❌ generateMetadata: Failed to generate metadata for "${slug}".`
    );
    return {};
  }

  const metadataObject = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots,
    authors: metadata.authors,
    alternates: {
      canonical: metadata.canonical,
      languages: metadata.alternates.reduce((acc, alt) => {
        if (alt.hreflang && alt.href) {
          acc[alt.hreflang] = alt.href;
        }
        return acc;
      }, {}),
    },
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    icons: {
      icon: metadata.icons.icon,
      apple: metadata.icons.appleTouchIcon,
    },
    manifest: metadata.manifest,
  };

  if (metadata.isMajorCity && metadata.enhancedMeta) {
    metadataObject.other = metadataObject.other || {};
    Object.assign(metadataObject.other, {
      "geo.region": metadata.enhancedMeta.geoRegion,
      "geo.placename": metadata.enhancedMeta.geoPlacename,
      "geo.position": metadata.enhancedMeta.geoPosition,
      ICBM: metadata.enhancedMeta.icbm,
      "course.provider": metadata.enhancedMeta.courseProvider,
      "course.location": metadata.enhancedMeta.courseLocation,
      "course.category": metadata.enhancedMeta.courseCategory,
      "theme-color": metadata.enhancedMeta.themeColor,
      "msapplication-navbutton-color":
        metadata.enhancedMeta.msApplicationNavButtonColor,
      "apple-mobile-web-app-status-bar-style":
        metadata.enhancedMeta.appleStatusBarStyle,
      "mobile-web-capable": metadata.enhancedMeta.mobileWebCapable,
      "apple-mobile-web-app-capable":
        metadata.enhancedMeta.appleMobileCapable,
      "apple-mobile-web-app-title": metadata.enhancedMeta.appleMobileTitle,
    });
  }

  if (metadata.facebook?.appId) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["fb:app_id"] = metadata.facebook.appId;
  }
  if (metadata.pinterest?.richPin) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["pinterest-rich-pin"] = metadata.pinterest.richPin;
  }

  return metadataObject;
}

const CourseCityPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return notFound();

  const parsed = parseSlug(slug);
  if (!parsed) {
    console.warn(
      `❌ CourseCityPage: Slug "${slug}" does not match course-city pattern.`
    );
    return notFound();
  }

  // ✅ CHANGED: resolve alias before lookup
  const { courseSlug: rawCourseSlug, citySlug } = parsed;
  const courseSlug = COURSE_SLUG_ALIASES[rawCourseSlug] || rawCourseSlug;
  const cityLinkCourseSlug =
    PREFERRED_CITY_LINK_SLUGS[rawCourseSlug] || rawCourseSlug;

  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(`❌ CourseCityPage: Course "${courseSlug}" or City "${citySlug}" not found.`);
    return notFound();
  }

  const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);

  const processPlaceholders = (obj, cityNameToUse) => {
    if (typeof obj === "string") {
      // ✅ CHANGED: escaped curly braces for correct regex
      return obj.replace(/\{city\}/g, cityNameToUse);
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => processPlaceholders(item, cityNameToUse));
    }
    if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = processPlaceholders(obj[key], cityNameToUse);
      }
      return newObj;
    }
    return obj;
  };

  // ✅ CITY-SPECIFIC HEADER
  // Prefer the city-specific header file (mumbai → dsHeaderData-mumbai.json)
  // Fall back to the header already present on the course object (Pune default)
  const cityHeader = getHeaderForCity(courseSlug, citySlug);
  const rawHeader = cityHeader || course.header;
  const headerData = processPlaceholders(rawHeader, city.name);

  const cityWhy = getWhyForCity(courseSlug, citySlug);
  const whyData = processPlaceholders(cityWhy || course.why, city.name);

  const cityWhat = getWhatYouWillLearnForCity(courseSlug, citySlug);
  const whatYouWillLearnData = processPlaceholders(
    cityWhat || course.whatYouWillLearn,
    city.name
  );

  const citySkills = getSkillsForCity(courseSlug, citySlug);
  const skillsntoolsdata = processPlaceholders(
    citySkills || course.skillsndtools,
    city.name
  );

  const cityWho = getWhoThisIsForForCity(courseSlug, citySlug);
  const whothisisfor = processPlaceholders(
    cityWho || course.whothisisfor,
    city.name
  );

  const cityCert = getCertificateForCity(courseSlug, citySlug);
  const certificateData = processPlaceholders(
    cityCert || course.certificate,
    city.name
  );

  // ---------- Demo / CTA Banner ----------
  const cityDemoBanner = getDemoBannerForCity(courseSlug, citySlug);
  const demoBannerData = processPlaceholders(
    cityDemoBanner || course.demoBanner,
    city.name
  );

  const isSapCourse = course.category === "sap";

  const sapModData =
    isSapCourse && course.sapMod
      ? processPlaceholders(course.sapMod, city.name)
      : null;
  const modulesData = course.modulesData
    ? processPlaceholders(course.modulesData, city.name)
    : null;

  const faqData = processPlaceholders(course.faq, city.name);
  const upcomingBatchesData = processPlaceholders(
    course.upcomingBatches,
    city.name
  );
  const reviewsData = processPlaceholders(course.reviews, city.name);
  const relatedCoursesData = processPlaceholders(course.relatedCourses, city.name);
  const descriptionContentData = processPlaceholders(course.descriptionContent, city.name);

  const shouldUseNewCurriculum =
    !isSapCourse &&
    modulesData &&
    modulesData.tabs &&
    Array.isArray(modulesData.tabs);
  const shouldUseLegacyModules =
    !isSapCourse && modulesData && !shouldUseNewCurriculum;

  const dynamicBodyContent = `
    <div class="course-main-content">
      <section class="course-summary">
        <h3>About Our ${course.fullTitle} Course</h3>
        <p>Our comprehensive ${course.title} course in ${city.name} is designed to equip you with ${course.modules.length} key modules, practical skills, and industry insights. With a duration of ${course.duration}, you'll gain expertise in areas like: ${course.modules.slice(0, 3).join(", ")}${course.modules.length > 3 ? "..." : ""}.</p>
        <p>Get ready for a successful career in roles such as ${course.jobRoles.slice(0, 2).join(" or ")}.</p>
      </section>
      ${renderOfficeSpecificContent(city, course.title)}
      <section class="career-path">
        <h3>Career Opportunities After ${course.fullTitle} Training</h3>
        <p>Upon successful completion of our ${course.title} course, you'll be prepared for diverse and rewarding career paths, including:</p>
        <ul>
          ${course.jobRoles.map((role) => `<li>${role}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;

  function renderOfficeSpecificContent(cityData, courseTitle) {
    if (cityData.hasOffice && cityData.office) {
      return `
        <section class="our-local-presence">
          <h3>Visit Our Training Center in ${cityData.name}</h3>
          <p>We're proud to offer in-person training at our state-of-the-art facility in ${cityData.name}.</p>
          <p><strong>Address:</strong> ${cityData.office.address}</p>
          <p><strong>Phone:</strong> ${cityData.office.phone}</p>
          <p><strong>Operating Hours:</strong> ${cityData.office.hours.open} - ${cityData.office.hours.close} daily</p>
          <p>Rated <strong>${cityData.office.rating}/5</strong> by ${cityData.office.reviewCount} students on Google.</p>
          ${cityData.office.mapUrl ? `<p><a href="${cityData.office.mapUrl}" target="_blank" rel="noopener noreferrer">Get Directions to our ${courseTitle} Training Center</a></p>` : ""}
        </section>
      `;
    }
    return "";
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {headerData?.backgroundVideo && (
        <link
          rel="preload"
          as="video"
          href={headerData.backgroundVideo}
          type="video/mp4"
          fetchPriority="high"
        />
      )}
      {headerData?.backgroundPoster && (
        <link
          rel="preload"
          as="image"
          href={headerData.backgroundPoster}
          fetchPriority="high"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />
      <ClientCourseSections
        layoutType="default"
        whothisisfor={whothisisfor}
        skillsntoolsdata={skillsntoolsdata}
        headerData={headerData}
        whyData={whyData}
        whatYouWillLearnData={whatYouWillLearnData}
        sapModData={sapModData}
        course={course}
        modulesData={modulesData}
        descriptionContentData={descriptionContentData}
        certificateData={certificateData}
        faqData={faqData}
        upcomingBatchesData={upcomingBatchesData}
        reviewsData={reviewsData}
        demoBannerData={demoBannerData}
        cityLinks={<CityLinks courseSlug={cityLinkCourseSlug} />}
        relatedCoursesData={relatedCoursesData}
        currentCityName={city.name}
        courseCategory={course.category}
        shouldUseNewCurriculum={shouldUseNewCurriculum}
        shouldUseLegacyModules={shouldUseLegacyModules}
      />
    </>
  );
};

export default CourseCityPage;