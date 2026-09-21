// lib/masterData.js
// Only helpers + assembly logic. All pure data lives in public/Jsonfolder/*.json

// why course cards data 
import whyDataPune from "../../public/Jsonfolder/cities/pune/WhyData-pune.json";
import whyDataMumbai from "../../public/Jsonfolder/cities/mumbai/WhyData-mumbai.json";
import whyDataRaipur from "../../public/Jsonfolder/cities/raipur/WhyData-raipur.json";

// Hero section data
import dsHeaderDataPune from "../../public/Jsonfolder/cities/pune/dsHeaderData-pune.json";
import dsHeaderDataMumbai from "../../public/Jsonfolder/cities/mumbai/dsHeaderData-mumbai.json";
import dsHeaderDataRaipur from "../../public/Jsonfolder/cities/raipur/dsHeaderData-raipur.json";

// What you'll learn data
import whatWillLearnDataPune from "../../public/Jsonfolder/cities/pune/whatwilllearn-pune.json";
import whatWillLearnDataMumbai from "../../public/Jsonfolder/cities/mumbai/whatwilllearn-mumbai.json";
import whatWillLearnDataRaipur from "../../public/Jsonfolder/cities/raipur/whatwilllearn-raipur.json";

// skills you'll learn
import skillsDataPune from "../../public/Jsonfolder/cities/pune/SkillsLearn-pune.json";
import skillsDataMumbai from "../../public/Jsonfolder/cities/mumbai/SkillsLearn-mumbai.json";
import skillsDataRaipur from "../../public/Jsonfolder/cities/raipur/SkillsLearn-raipur.json";

//who this is for
import whoDataPune from "../../public/Jsonfolder/cities/pune/Whothisisfor-pune.json";
import whoDataMumbai from "../../public/Jsonfolder/cities/mumbai/Whothisisfor-mumbai.json";
import whoDataRaipur from "../../public/Jsonfolder/cities/raipur/Whothisisfor-raipur.json";

//certificate data
import certificateDataPune from "../../public/Jsonfolder/cities/pune/certificateData-pune.json";
import certificateDataMumbai from "../../public/Jsonfolder/cities/mumbai/certificateData-mumbai.json";
import certificateDataRaipur from "../../public/Jsonfolder/cities/raipur/certificateData-raipur.json";

import faqData from "../../public/Jsonfolder/faqdata.json";

// CTABanner data
import CTABannerData from "../../public/Jsonfolder/cities/pune/CTAbanner.json";
import CTABannerDataMumbai from "../../public/Jsonfolder/cities/mumbai/CTAbanner-mumbai.json";
import CTABannerDataRaipur from "../../public/Jsonfolder/cities/raipur/CTAbanner-raipur.json";


import alumni from "../../public/Jsonfolder/alumni.json";
import icons from "../../public/Jsonfolder/icons.json";
import generatedCourseSpecs from "../../public/Jsonfolder/generatedCourseSpecs.json";
import relatedCoursesLists from "../../public/Jsonfolder/relatedCoursesLists.json";
import citiesData from "../../public/Jsonfolder/cities.json";
import enrichmentMaps from "../../public/Jsonfolder/enrichmentMaps.json";

import coursesSap from "../../public/Jsonfolder/courses-sap.json";
import coursesIt from "../../public/Jsonfolder/courses-it.json";
import coursesHr from "../../public/Jsonfolder/courses-hr.json";

// =====================================================
// HELPERS
// =====================================================

const { iconMap, defaultSapRelatedCourseIcon, sapRelatedCourseIconMap } = icons;

const getSapRelatedCourseIcon = (courseName = "") => {
  const normalizedName = courseName.toUpperCase();
  const matchedKey = Object.keys(sapRelatedCourseIconMap).find((key) =>
    normalizedName.includes(key)
  );
  return matchedKey
    ? sapRelatedCourseIconMap[matchedKey]
    : defaultSapRelatedCourseIcon;
};

const makeRelatedCourses = (names) => ({
  title: "Related courses",
  items: names.map((name) => ({
    name,
    description: `Learn ${name} from experts`,
    icon: name.startsWith("SAP")
      ? getSapRelatedCourseIcon(name)
      : iconMap.Cloud,
    alt: `${name} icon`,
  })),
});

const makeGeneratedCourseModulesData = (spec) => ({
  title: `${spec.title} CURRICULUM`,
  globalActions: {
    startLearning: `https://example.com/start-learning-${spec.slug}`,
    downloadCurriculum: `https://example.com/download-curriculum-${spec.slug}`,
  },
  banner: {
    title: `Master ${spec.fullTitle}`,
    subtitle: "Build practical skills with guided labs and project-based learning.",
    image:
      "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
    technologies: spec.modules,
  },
  tabs: [
    {
      type: "beginner",
      duration: spec.duration,
      modules: spec.curriculum.map((module) => ({
        title: module.title,
        duration: module.duration,
        content: module.content,
        detailedContent: module.content.map(
          (topic) => `Hands-on practice for ${topic}`
        ),
        toolsAndTechnologies: module.tools.map((tool) => ({
          name: tool,
          icon: iconMap[tool] || iconMap.Cloud,
          alt: tool,
        })),
        actions: {
          startLearning: `https://example.com/start-learning-${spec.slug}`,
          downloadCurriculum: `https://example.com/download-curriculum-${spec.slug}`,
        },
      })),
    },
  ],
});

// =====================================================
// 1. BUILD GENERATED COURSES
// =====================================================

const generatedCourseData = generatedCourseSpecs.reduce((acc, spec) => {
  const isSap = spec.category === "sap";
  const courseWord = isSap ? "SAP training" : "IT training";
  const backgroundVideo =
    "https://res.cloudinary.com/bropujss/video/upload/v1784205478/digital_kaitnq_clpqqp.webm";

  acc[spec.slug] = {
    title: spec.title,
    fullTitle: spec.fullTitle,
    category: spec.category,
    slug: spec.slug,
    description: `Join the best ${spec.title} course in {city} and master ${spec.fullTitle} with expert-led training, real-time projects, certification guidance, and 100%  placement support.`,
    metaTitle: `${spec.title} Course in {city} | Training & Certification`,
    metaDescription: `Master ${spec.title} in {city}. Expert-led training, hands-on projects, certification guidance, and 100%  placement support for career growth.`,
    duration: spec.duration,
    price: spec.price,
    modules: spec.modules,
    prerequisites: spec.prerequisites,
    certification: spec.certification,
    jobRoles: spec.jobRoles,
    header: {
      title: `${spec.title} Course in {city}`,
      subtitle: `Practical Based Job Oriented ${courseWord} in {city}`,
      description: `Connecting Dots ERP's ${spec.title} course in {city} is designed around industry use cases, guided labs, and mentor-led practice. Learn ${spec.modules
        .slice(0, 4)
        .join(", ")} and prepare for ${spec.jobRoles
          .slice(0, 2)
          .join(" and ")} roles.`,
      backgroundVideo,
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni,
      buttons: [
        { text: "Request Call Back", courseName: `${spec.title} Program` },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          {
            type: "location",
            name: "location",
            placeholder: "Select your location",
          },
          { type: "course", name: "course", placeholder: "Select course" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },
    why: {
      title: `Why ${spec.title}?`,
      cards: [
        {
          title: `What is <span class="highlight-span-cards">${spec.title}</span>?`,
          content: `${spec.fullTitle} helps professionals build practical capability across ${spec.modules
            .slice(0, 3)
            .join(", ")} and connected enterprise workflows.`,
        },
        {
          title: `What does a <span class="highlight-span-cards">${spec.title} Professional</span> do?`,
          content: `${spec.title} professionals configure, operate, analyze, and improve business technology processes using industry-standard tools and project practices.`,
          listItems: spec.jobRoles.slice(0, 3),
        },
        {
          title: `Why take <span class="highlight-span-cards">${spec.title}</span> training in {city}?`,
          content: `Our ${spec.title} training in {city} combines curriculum-led learning, real scenarios, assignments, and interview preparation so learners become job ready.`,
          listItems: [
            "Hands-on labs",
            "Project-based practice",
            "Placement assistance",
          ],
        },
      ],
    },
    sapMod: isSap
      ? {
        title2: `<span class="highlight-span-cards">${spec.title}</span> Syllabus`,
        description: `Industry aligned ${spec.title} syllabus with certification guidance`,
        summary: `A practical ${spec.title} syllabus designed by industry experts to help you prepare for project and consultant roles.`,
        noteMaster: `We provide advanced ${spec.title} training`,
        noteAdvance: "Advance",
        features: [
          { label: "10+", description: "Tools & Concepts" },
          { label: "120+", description: "Live Session Hours" },
        ],
        overview: {
          title: "Syllabus Overview",
          modules: spec.curriculum.map((module) => ({
            name: module.title,
            duration: module.duration,
            subtopics: module.content,
          })),
        },
        videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
        downloadLink: `https://example.com/download-${spec.slug}-syllabus`,
      }
      : undefined,
    descriptionContent: {
      title: `Why Choose Connecting Dots ERP for ${spec.title} Training in {city}?`,
      paragraphs: [
        `Connecting Dots ERP offers a structured ${spec.title} course in {city} for students, working professionals, and career switchers who want practical skills in ${spec.fullTitle}.`,
        `The curriculum covers ${spec.modules.join(
          ", "
        )} with guided practice, project scenarios, and trainer support so learners understand how the subject is used in real business environments.`,
      ],
      listItem1Header: `What makes our ${spec.title} training in {city} useful?`,
      listItem1: [
        "Industry-oriented curriculum with practical assignments.",
        "Experienced trainers with project exposure.",
        "Flexible batches for students and working professionals.",
        "Interview preparation and 100%  placement support.",
        "Certification-focused learning path.",
      ],
      listItemAfterIndex: 1,
      paragraphsAfterList: [
        `After completing the ${spec.title} course in {city}, you can apply for roles such as ${spec.jobRoles
          .slice(0, 3)
          .join(", ")}.`,
        `Join our ${spec.title} classes in {city} to build a clear, job-oriented path into ${spec.fullTitle}.`,
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: `What is ${spec.title}?`,
          answer: `${spec.title} stands for ${spec.fullTitle}. It is used by organizations to solve practical business and technology challenges through structured processes and tools.`,
        },
        {
          question: `Who can join the ${spec.title} course in {city}?`,
          answer: `Students, freshers, working professionals, and domain users can join. ${spec.prerequisites}.`,
        },
        {
          question: `What will I learn in ${spec.title} training?`,
          answer: `You will learn ${spec.modules
            .slice(0, 5)
            .join(", ")} through practical sessions and project-based assignments.`,
        },
        {
          question: `Does this ${spec.title} course include placement support?`,
          answer:
            "Yes. The course includes resume guidance, interview preparation, and 100%  placement support from the training team.",
        },
        {
          question: `How long is the ${spec.title} course?`,
          answer: `The ${spec.title} course usually takes ${spec.duration}, depending on the batch schedule and learning mode.`,
        },
      ],
    },
    relatedCourses: makeRelatedCourses(
      isSap ? relatedCoursesLists.sap : relatedCoursesLists.it
    ),
    defaultRating: 4.7,
    defaultReviewCount: 82,
    publishedAt: "2025-08-01T00:00:00Z",
    updatedAt: "2026-05-13T00:00:00Z",
  };

  if (!isSap) {
    acc[spec.slug].modulesData = makeGeneratedCourseModulesData(spec);
    acc[spec.slug].header.buttons[1].text = "Download Curriculum";
    delete acc[spec.slug].sapMod;
  }

  return acc;
}, {});

// =====================================================
// 2. ASSEMBLE BASE COURSES
// =====================================================

let coursesData = {
  ...coursesSap,
  ...coursesIt,
  ...coursesHr,
  ...generatedCourseData,
};

// =====================================================
// 3. ALIASES
// =====================================================

coursesData["data-science-with-ai"] = coursesData["data-science"];
coursesData["advanced-data-analytics-with-generative-ai"] =
  coursesData["data-analytics"];
coursesData["python-with-ai"] = coursesData["python"];
coursesData["data-visualization-with-ai"] = coursesData["data-visualization"];
coursesData["full-stack-with-ai"] =
  coursesData["full-stack-developer"] ?? coursesData["full-stack"];
coursesData["it-course-with-ai"] = coursesData["it"];
coursesData["hr-courses-training-institute"] = coursesData["hr-training"];
coursesData["hr"] = coursesData["hr-training"];
coursesData["generative-ai"] = coursesData["chatgpt"]; // will be refined in step 6

// =====================================================
// 4. ENRICHMENT (matches your enrichmentMaps.json)
// =====================================================

const {
  whatWillLearnMap,
  skillsToCoursesMap,
  headerMap,
  whyMap,
  skillsMap,
  whoMap,
  certificateMap,
  faqMap,
} = enrichmentMaps;

// ---------- Header ----------
Object.entries(headerMap || {}).forEach(([courseSlug, [groupKey, headerKey]]) => {
  if (coursesData[courseSlug] && dsHeaderDataPune?.[groupKey]?.[headerKey]) {
    coursesData[courseSlug].header = dsHeaderDataPune[groupKey][headerKey];
  }
});

// ---------- Why ----------
Object.entries(whyMap || {}).forEach(([courseSlug, [groupKey, whyKey]]) => {
  if (!coursesData[courseSlug]) return;

  if (whyDataPune?.[groupKey]?.[whyKey]) {
    coursesData[courseSlug].why = whyDataPune[groupKey][whyKey];
  } else if (whyDataPune?.[courseSlug]) {
    coursesData[courseSlug].why = whyDataPune[courseSlug];
  }
});

// ---------- What You'll Learn  (IMPORTANT: direction is courseSlug → whatKey) ----------
Object.entries(whatWillLearnMap || {}).forEach(([courseSlug, whatKey]) => {
  const data = whatWillLearnDataPune?.[whatKey];

  if (!coursesData[courseSlug]) {
    console.warn(`[WhatYouWillLearn] course not found: ${courseSlug}`);
    return;
  }
  if (!data) {
    console.warn(`[WhatYouWillLearn] no data for key: ${whatKey}`);
    return;
  }

  coursesData[courseSlug].whatYouWillLearn = Array.isArray(data)
    ? data
    : data.items || data.cards || [];
});

// ---------- Skills & Tools ----------
// Your skillsMap is: courseSlug → SkillsKey
Object.entries(skillsMap || {}).forEach(([courseSlug, skillsKey]) => {
  if (coursesData[courseSlug] && skillsDataPune?.[skillsKey]) {
    coursesData[courseSlug].skillsndtools = skillsDataPune[skillsKey];
  }
});

// ---------- Who This Is For ----------
// Your whoMap is: courseSlug → whoKey
Object.entries(whoMap || {}).forEach(([courseSlug, whoKey]) => {
  if (coursesData[courseSlug] && whoDataPune?.[whoKey]) {
    coursesData[courseSlug].whothisisfor = whoDataPune[whoKey];
  }
});

// ---------- Certificate ----------
Object.entries(certificateMap || {}).forEach(([courseSlug, certKey]) => {
  if (coursesData[courseSlug] && certificateDataPune?.[certKey]) {
    coursesData[courseSlug].certificate = certificateDataPune[certKey];
  }
});

// ---------- FAQ ----------
Object.entries(faqMap || {}).forEach(([courseSlug, [groupKey, faqKey]]) => {
  if (!coursesData[courseSlug]) return;

  // faqData is the big JSON you just pasted (import it if not already)
  const faqEntry = faqData?.[groupKey]?.[faqKey];

  if (faqEntry) {
    coursesData[courseSlug].faq = faqEntry;
  }
});


// ---------- CTA Banner ----------
Object.entries(enrichmentMaps?.demoBannerMap || {}).forEach(([courseSlug, bannerKey]) => {
  if (coursesData[courseSlug] && CTABannerData?.[bannerKey]) {
    coursesData[courseSlug].demoBanner = CTABannerData[bannerKey];
  }
});

// =====================================================
// 5. FIX SAP RELATED COURSE ICONS
// =====================================================

Object.values(coursesData).forEach((course) => {
  if (course.category !== "sap" || !course.relatedCourses?.items) return;

  course.relatedCourses.items = course.relatedCourses.items.map((item) => ({
    ...item,
    icon: getSapRelatedCourseIcon(item.name),
    alt: item.alt || `${item.name} icon`,
  }));
});

// =====================================================
// 6. SPECIAL generative-ai OVERRIDE
// =====================================================

if (coursesData.chatgpt) {
  const base = coursesData.chatgpt;

  coursesData["generative-ai"] = {
    ...base,
    title: "Generative AI",
    fullTitle: "Generative AI and Prompt Engineering",
    category: "it",
    slug: "generative-ai",
    description:
      "Master Generative AI in {city} with expert-led training in AI tools, prompt engineering, automation, and real-world AI projects. Our Generative AI course in {city} includes hands-on practice, certification guidance, and 100%  placement support.",
    metaTitle: "Generative AI Course in {city} | AI Training & Certification",
    metaDescription:
      "Master Generative AI in {city}. Learn AI tools, prompt engineering, automation, projects, certification guidance, and 100%  placement support.",
    header: {
      ...(base.header || {}),
      title: "Generative AI Course in {city}",
      subtitle:
        "Get Certified with the Best Generative AI Training Program in {city}",
      description:
        "Connecting Dots ERP's Generative AI course in {city} helps you master AI tools, prompt engineering, automation workflows, machine learning foundations, and real-world AI project practice for modern tech and business roles.",
    },
    why: base.why
      ? {
        ...base.why,
        title: "Why Generative AI?",
        cards: (base.why.cards || []).map((card) => ({
          ...card,
          title: (card.title || "").replace("ChatGPT and AI", "Generative AI"),
          content: (card.content || "")
            .replace(/generative-ai and AI/g, "Generative AI")
            .replace(/Artificial Intelligence/g, "Generative AI"),
        })),
      }
      : { title: "Why Generative AI?", cards: [] },
  };
}

// =====================================================
// 7. CITY-AWARE HELPER
// =====================================================

/**
 * Returns the correct header object for a course + city.
 * Uses dsHeaderData-mumbai.json for mumbai, otherwise the default (Pune) file.
 */
export function getHeaderForCity(courseSlug, citySlug = "pune") {
  const headerSource =
    citySlug === "mumbai" ? dsHeaderDataMumbai : citySlug === "raipur" ? dsHeaderDataRaipur : dsHeaderDataPune;

  const path = enrichmentMaps?.headerMap?.[courseSlug];
  if (!path) return null;

  const [groupKey, headerKey] = path;
  return headerSource?.[groupKey]?.[headerKey] || null;
}

/**
 * Mumbai-only overrides for courses that share "Whysap" in whyMap
 * but have dedicated Mumbai Why content.
 */
const MUMBAI_WHY_OVERRIDES = {
  "sap-mm": ["Whymm", "WhyMM"],
  "sap-hr-hcm": ["Whyhrhcm", "WhyHRHCM"],
  "sap-qm": ["Whyqm", "WhyQM"],
  "sap-ps": ["Whyps", "WhyPS"],
  "sap-scm": ["Whyscm", "WhySCM"],
  "sap-ehs": ["Whyehs", "WhyEHS"],
  "sap-ibp": ["Whyibp", "WhyIBP"],
  "sap-pp": ["Whypp", "WhyPP"],
  "sap-pm": ["Whypm", "WhyPM"],
  "sap-btp": ["Whybtp", "WhyBTP"],
  "sap-grc": ["Whygrc", "WhyGRC"],
};

/**
 * Returns the correct Why object for a course + city.
 * Uses WhyData-mumbai.json for mumbai, otherwise the default (Pune) file.
 */
export function getWhyForCity(courseSlug, citySlug = "pune") {
  const whySource = citySlug === "mumbai" ? whyDataMumbai : citySlug === "raipur" ? whyDataRaipur : whyDataPune;

  const path =
    (citySlug === "mumbai" && MUMBAI_WHY_OVERRIDES[courseSlug]) ||
    enrichmentMaps?.whyMap?.[courseSlug];
  if (!path) return null;

  const [groupKey, whyKey] = path;
  return whySource?.[groupKey]?.[whyKey] || null;
}

export function getWhoThisIsForForCity(courseSlug, citySlug = "pune") {
  const source =
    citySlug === "mumbai" ? whoDataMumbai : citySlug === "raipur" ? whoDataRaipur : whoDataPune;

  const whoKey = enrichmentMaps?.whoMap?.[courseSlug];
  if (!whoKey) return null;

  return source?.[whoKey] || null;
}


/**
 * Returns the correct WhatYouWillLearn array for a course + city.
 * Uses WhatYouWillLearn-mumbai.json for mumbai, otherwise the default (Pune) file.
 */
export function getWhatYouWillLearnForCity(courseSlug, citySlug = "pune") {
  const source =
    citySlug === "mumbai" ? whatWillLearnDataMumbai : citySlug === "raipur" ? whatWillLearnDataRaipur : whatWillLearnDataPune;

  const whatKey = enrichmentMaps?.whatWillLearnMap?.[courseSlug];
  if (!whatKey) return null;

  const data = source?.[whatKey];
  if (!data) return null;

  // same normalisation the enrichment step uses
  return Array.isArray(data) ? data : data.items || data.cards || [];
}

export function getSkillsForCity(courseSlug, citySlug = "pune") {
  const source =
    citySlug === "mumbai" ? skillsDataMumbai : citySlug === "raipur" ? skillsDataRaipur : skillsDataPune;

  const skillsKey = enrichmentMaps?.skillsMap?.[courseSlug];
  if (!skillsKey) return null;

  return source?.[skillsKey] || null;
}

export function getCourseData(slug, citySlug = "pune") {
  const base = coursesData[slug];
  if (!base) return null;

  const course = structuredClone(base);
  course.city = citiesData[citySlug] || null;

  // Override header with city-specific version when available
  const cityHeader = getHeaderForCity(slug, citySlug);
  if (cityHeader) {
    course.header = cityHeader;
  }

  // Override why with city-specific version when available
  const cityWhy = getWhyForCity(slug, citySlug);
  if (cityWhy) {
    course.why = cityWhy;
  }

  // Override demo banner with city-specific version when available
  const cityDemoBanner = getDemoBannerForCity(slug, citySlug);
  if (cityDemoBanner) {
    course.demoBanner = cityDemoBanner;
  }

  return course;
}


export function getCertificateForCity(courseSlug, citySlug = "pune") {
  const source =
    citySlug === "mumbai" ? certificateDataMumbai : citySlug === "raipur" ? certificateDataRaipur : certificateDataPune;

  const certKey = enrichmentMaps?.certificateMap?.[courseSlug];
  if (!certKey) return null;

  return source?.[certKey] || null;
}

/**
 * Returns the Demo / CTA Banner object for a course + city.
 * Currently uses the single SapDemoBanner.json; swap the source
 * when you create city-specific files.
 */
export function getDemoBannerForCity(courseSlug, citySlug = "pune") {
  const source = citySlug === "mumbai" ? CTABannerDataMumbai
    : citySlug === "raipur" ? CTABannerDataRaipur
      : CTABannerData;
  const bannerKey = enrichmentMaps?.demoBannerMap?.[courseSlug];
  if (!bannerKey) return null;

  return source?.[bannerKey] || null;
}

// =====================================================
// 8. EXPORTS
// =====================================================

export {
  coursesData,
  citiesData,
  dsHeaderDataPune,
  dsHeaderDataMumbai,
  whyDataPune,
  whyDataMumbai,
  enrichmentMaps,
  faqData,
};
