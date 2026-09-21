// app/HomeClient.jsx  (client component)
'use client';

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";
import WhatWeOffer from "../../components/HomePage/WhatWeOffer"
import Container from "@/components/StandardContainer";

// Dynamic FAQ from masterdata (same pattern as other pages)
import { faqData } from "@/lib/masterData";
import SapDemoBanner from "@/components/CoursesComponents/CTAbanner";

// Homepage CTA data
import sapDemoBannerData from "../../../public/Jsonfolder/cities/pune/CTAbanner.json"; // Pune / default
// or if you prefer city-aware later:
// import { getDemoBannerForCity } from "@/lib/masterData";

// const Marquee = dynamic(() => import("@/components/HomePage/Marquee2"), {
//   ssr: false,
//   loading: () => <div style={{ height: "60px" }} />,
// });
import Marquee from "@/components/HomePage/Marquee2";

const TrainingProcessSection = dynamic(() => import('@/components/HomePage/ProcessSection'), {
  ssr: false,
})

const WhyChooseSection = dynamic(() => import("@/components/HomePage/WhyChooseSection"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "300px" }} />,
});

const OurClients = dynamic(() => import("@/components/HomePage/OurClients"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

const OurStats = dynamic(() => import("@/components/HomePage/OurStats"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "250px" }} />,
});

const FeedbackAndReviews = dynamic(
  () => import("@/components/HomePage/FeedbackandReviews"),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "400px" }} />,
  }
);

const Courses = dynamic(() => import("@/components/HomePage/PopCourses"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "520px", position: "absolute", top: '-105px' }} />,
});

const LatestBlogs = dynamic(() => import("@/components/HomePage/Blogs"), {
  ssr: false,
  loading: () => <div style={{ minHeight: "400px" }} />,
});

const FAQAccordion = dynamic(() => import("@/components/CoursesComponents/FAQ"), {
  ssr: false,
  loading: () => <div style={{ minHeight: '600px' }} />
})

// Dynamically pick FAQ data for the home page from masterdata
const homeFaqData = (() => {
  const section = faqData?.homefaq?.HomeFAQ;
  if (!section || section.length === 0) return [];
  return section;
})();

// Homepage CTA Banner data
const homeCtaData = sapDemoBannerData?.homepage || {};

const LazySection = ({ children, fallback, rootMargin = "350px", intrinsicSize }) => {
  const ref = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={ref}
      style={
        intrinsicSize
          ? {
            contentVisibility: "auto",
            containIntrinsicSize: intrinsicSize,
          }
          : undefined
      }
    >
      {shouldRender ? children : fallback}
    </div>
  );
};

export default function HomeClient() {
  return (
    <>
      <Container className="box-border">
        <main className="flex-col justify-center items-center overflow-y-hidden  overflow-x-hidden w-full max-w-[1800px]">
          <h1 className="hidden">
            Job-Oriented Training That Gets You Hired
          </h1>

          {/* Above the fold */}
          <HeaderCarousel />
          <Marquee />
          <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
            <OurClients />
          </LazySection>

          {/* Below the fold — lazy loaded */}
          {/* <LazySection fallback={<div style={{ height: "60px" }} />}>
            marquee compo
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
          our clients
          </LazySection> */}
          <LazySection fallback={<div style={{ minHeight: "200px" }} />}>
            <WhatWeOffer />
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "520px" }} />} intrinsicSize="520px">
            <Courses />
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "300px" }} />}>
            <WhyChooseSection />
          </LazySection>
          <LazySection fallback={<div />}>
            <TrainingProcessSection />
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
            <FeedbackAndReviews />
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
            <LatestBlogs />
          </LazySection>
          <LazySection fallback={<div style={{ minHeight: "250px" }} />}>
            <OurStats />
          </LazySection>

          {/* Homepage CTA Banner */}
          <SapDemoBanner {...homeCtaData} />

          <LazySection fallback={<div style={{ minHeight: "400px" }} />}>
            <FAQAccordion data={homeFaqData} />
          </LazySection>

        </main>
      </Container>
    </>
  );
}