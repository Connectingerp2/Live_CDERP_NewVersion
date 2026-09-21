// app/(routes)/placements/page.js
import PlacementsClient from "./PlacementsClient";
import { jsonLd } from "./metadata";

// Re-export metadata so Next.js picks it up for <head> injection
export { metadata } from "./metadata";

export default function PlacementsPage() {
  return (
    <>
      {/* JSON-LD is server-rendered so it's visible to crawlers */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accessible hidden headings for SEO crawlers */}
      <div className="sr-only" aria-hidden="true">
        <h1>100% Job Placement Assistance at Connecting Dots ERP</h1>
        <h2>100% Placement Support for SAP, IT, and HR Training Students</h2>
        <h2>Interview Preparation and Resume Building</h2>
        <h2>Career Guidance and Hiring Partner Support</h2>
        <h2>Average Package 6 LPA and Highest Package 24 LPA</h2>
      </div>

      <PlacementsClient />
    </>
  );
}
