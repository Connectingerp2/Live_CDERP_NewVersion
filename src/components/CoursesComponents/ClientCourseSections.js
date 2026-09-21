"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import CoursesRelated from "./RelatedCourses";
import CoursesTrustBar from "./CoursesTrustBar";
import WhatYouWillLearn from "./WhatYouWillLearn";
import SkillsAndTools from "./SkillsAndTools";
import WhoThisIsFor from "./WhoThisIsFor";
import SapAbapSyllabus from "./SyllabusCard";
import SapDemoBanner from "./CTAbanner";
// import {CityLinks} from "@/components/CityLinks";
// === Above the fold (SSR enabled for SEO-critical content) ===
import DSHeader from "./Header";
const UpcomingBatches = dynamic(() => import("./UpcomingBatches"))
const Reviews = dynamic(() => import("./Reviews"));
const Why = dynamic(() => import("./Why"));
const SapModComponent = dynamic(() => import("./sapmod"), { ssr: false });
const Modules = dynamic(() => import("./Modules"), { ssr: false });
const Certificate = dynamic(() => import("../HomePage/Certificate"), { ssr: false });
const Description = dynamic(() => import("./Description"), { ssr: false });
const FAQ = dynamic(() => import("./FAQ"), { ssr: false });
const HrCard = dynamic(() => import("./HRCard"), { ssr: false });
// const CityLinks = dynamic(()=>import("@/components/CityLinks"),{ssr : false});

export default function ClientCourseSections(props) {
  const {
    layoutType, // 'digital' | 'default'
    headerData,
    whyData,
    skillsntoolsdata,
    whothisisfor,
    whatYouWillLearnData,
    sapModData,
    course,
    modulesData,
    descriptionContentData,
    certificateData,
    faqData,
    upcomingBatchesData,
    reviewsData,
    cityLinks,
    relatedCoursesData,
    currentCityName,
    courseCategory,
    demoBannerData,
    shouldUseLegacyModules,
  } = props;
  // === Digital Marketing layout (multi-section courses) ===
  if (layoutType === "digital") {
    return (
      <>
        {/* --- Above-the-fold content --- */}
        <DSHeader data={headerData} />
        <Why data={whyData} />
        {sapModData && <SapModComponent data={sapModData} />}

        {shouldUseLegacyModules && (
          <Suspense fallback={null}>
            <Modules data={modulesData} />
          </Suspense>
        )}



        <Suspense fallback={null}>
          <Description data={descriptionContentData.main} />
        </Suspense>

        <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.ppc && (
              <Description data={descriptionContentData.ppc} sectionIndex={0} />
            )}
          </Suspense>
        </div>

        <div id="search-engine-optimization" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.seo && (
              <Description data={descriptionContentData.seo} sectionIndex={1} />
            )}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <Certificate data={certificateData} />
        </Suspense>

        <Suspense fallback={null}>
          <UpcomingBatches data={upcomingBatchesData} />
        </Suspense>

        <Suspense fallback={null}>
          <Reviews data={reviewsData} />
        </Suspense>


        <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.smm && (
              <Description data={descriptionContentData.smm} sectionIndex={0} />
            )}
          </Suspense>
        </div>

        <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            {descriptionContentData.analytics && (
              <Description data={descriptionContentData.analytics} sectionIndex={1} />
            )}
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <FAQ data={faqData} />
        </Suspense>

        <div

        >
          {cityLinks}
        </div>

        <Suspense fallback={null}>
          <CoursesRelated data={relatedCoursesData} currentCityName={currentCityName} />
        </Suspense>
      </>
    );
  }



  // === Default layout (e.g. SAP, HR, Data Analytics) ===
  return (
    <>
      {/* --- Above-the-fold --- */}
      <DSHeader data={headerData} />
      <CoursesTrustBar rating="4.9" />
      <Why data={whyData} />

      {/* what section  */}
      <WhatYouWillLearn data={whatYouWillLearnData} />
      {sapModData && <SapModComponent data={sapModData} />}

      <SapAbapSyllabus />

      <SkillsAndTools data={skillsntoolsdata} />

      <WhoThisIsFor data={whothisisfor} />

      <Suspense fallback={null}>
        <Certificate data={certificateData} />
      </Suspense>

      <Suspense fallback={null}>
        <UpcomingBatches data={upcomingBatchesData} />
      </Suspense>

      <Suspense fallback={null}>
        <Reviews data={reviewsData} />
      </Suspense>

      {
        courseCategory !== "hr" && (

          <Suspense fallback={null}>
            <CoursesRelated
              data={relatedCoursesData}
              currentCityName={currentCityName}
            />
          </Suspense>
        )
      }

      {courseCategory === "hr" && (
        <Suspense fallback={null}>
          <HrCard />
        </Suspense>
      )}


      <Suspense fallback={null}>
        <FAQ data={faqData} />
      </Suspense>

      <SapDemoBanner {...demoBannerData} />

      {shouldUseLegacyModules && (
        <div id="modules" style={{ scrollMarginTop: "80px" }}>
          <Suspense fallback={null}>
            <Modules data={modulesData} />
          </Suspense>
        </div>
      )}

      <div>
        {cityLinks}
      </div>
    </>
  );
}
