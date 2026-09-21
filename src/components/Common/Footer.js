// Footer.js

import Link from "next/link";
import Image from "next/image";

// Import the new Client Component that handles interactivity
import FooterClient from "./FooterClient";

const Icon = ({ path, className }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  facebook:
    "M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z",
  whatsapp:
    "M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.64a11.93 11.93 0 0 0 5.81 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.49-8.43Zm-8.45 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.23-.37a9.88 9.88 0 0 1-1.51-5.28c0-5.46 4.43-9.9 9.89-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.89-9.91 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.29-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z",
  youtube:
    "M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.56 12 3.56 12 3.56s-7.5 0-9.4.52A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.17-.42-.37-1.05-.42-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.37 2.22-.42 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.75 0 8.34.01 7.05.07 5.77.13 4.9.33 4.14.63a5.87 5.87 0 0 0-2.12 1.39A5.87 5.87 0 0 0 .63 4.14C.33 4.9.13 5.77.07 7.05.01 8.34 0 8.75 0 12s.01 3.66.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.12a5.87 5.87 0 0 0 2.12 1.39c.76.3 1.63.5 2.91.56 1.29.06 1.7.07 4.95.07s3.66-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.87 5.87 0 0 0 2.12-1.39 5.87 5.87 0 0 0 1.39-2.12c.3-.76.5-1.63.56-2.91.06-1.29.07-1.7.07-4.95s-.01-3.66-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.39-2.12A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.66.01 15.25 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
  map:
    "M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z",
  phone:
    "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.01l-2.2 2.2Z",
};

const socialLinks = [
  {
    href: "https://www.facebook.com/sapinstallation.pune.9",
    label: "Visit Connecting Dots ERP on Facebook",
    icon: ICONS.facebook,
    hoverClass: "hover:bg-[#3b5998]",
  },
  {
    href: "https://wa.me/919004002941",
    label: "Chat with Connecting Dots ERP on WhatsApp",
    icon: ICONS.whatsapp,
    hoverClass: "hover:bg-[#25d366]",
  },
  {
    href: "https://youtube.com/@connectingdotserp?si=hSKEiEg3MdytdEe_",
    label: "Watch Connecting Dots ERP on YouTube",
    icon: ICONS.youtube,
    hoverClass: "hover:bg-[#ff0000]",
  },
  {
    href: "https://in.linkedin.com/in/connecting-dots-erp-043039171",
    label: "Visit Connecting Dots ERP on LinkedIn",
    icon: ICONS.linkedin,
    hoverClass: "hover:bg-[#0077b5]",
  },
  {
    href: "https://www.instagram.com/connecting_dots_sap_training?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "Visit Connecting Dots ERP on Instagram",
    icon: ICONS.instagram,
    hoverClass: "hover:bg-[#c13584]",
  },
];

// Centralize all the link data here. This is passed to FooterClient.
const footerSections = [
  {
    title: "SAP S/4 HANA COURSES",
    categories: [
      {
        title: "SAP FUNCTIONAL COURSES",
        links: [
          { href: "/sap-fico-course-in-pune", text: "SAP FICO COURSE" },
          { href: "/sap-ariba-course-in-pune", text: "SAP ARIBA COURSE" },
          { href: "/sap-sd-course-in-pune", text: "SAP SD COURSE" },
          { href: "/sap-hr-hcm-course-in-pune", text: "SAP HR/HCM" },
          { href: "/sap-mm-course-in-pune", text: "SAP MM COURSE" },
          { href: "/sap-pp-course-in-pune", text: "SAP PP COURSE" },
          { href: "/sap-qm-course-in-pune", text: "SAP QM COURSE" },
          { href: "/sap-pm-course-in-pune", text: "SAP PM COURSE" },
          { href: "/sap-scm-course-in-pune", text: "SAP SCM COURSE" },
          { href: "/sap-ewm-course-in-pune", text: "SAP EWM COURSE" },
          { href: "/sap-btp-course-in-pune", text: "SAP BTP COURSE" },
          { href: "/sap-ehs-course-in-pune", text: "SAP EHS COURSE" },
          { href: "/sap-grc-course-in-pune", text: "SAP GRC COURSE" },
          { href: "/sap-ibp-course-in-pune", text: "SAP IBP COURSE" },
          {
            href: "/sap-successfactors-course-in-pune",
            text: "SAP SUCCESSFACTOR",
          },
        ],
      },
      {
        title: "SAP TECHNICAL COURSES",
        links: [
          { href: "/sap-abap-course-in-pune", text: "SAP ABAP COURSE" },
          { href: "/sap-basis-course-in-pune", text: "SAP BASIS COURSE" },
          { href: "/sap-bwbi-course-in-pune", text: "SAP BW/BI COURSE" },
          { href: "/sap-s4-hana-course-in-pune", text: "SAP S/4 HANA COURSE" },
        ],
      },
    ],
  },
  {
    title: "IT COURSES WITH AI",
    links: [
      {
        href: "/full-stack-with-ai-course-in-pune",
        text: "FULL STACK WITH AI",
      },
      { href: "/java-course-in-pune", text: "JAVA" },
      { href: "/python-with-ai-course-in-pune", text: "PYTHON WITH AI" },
      { href: "/aws-course-in-pune", text: "AWS" },
      { href: "/devops-course-in-pune", text: "DEVOPS" },
      { href: "/ai-ml-course-in-pune", text: "AIML" },
      { href: "/salesforce-course-in-pune", text: "SALESFORCE" },
    ],
  },
  {
    title: "ABOUT",
    links: [
      { href: "/aboutus", text: "ABOUT US" },
      { href: "/blogs", text: "BLOG" },
      { href: "/contactus", text: "CONTACT US" },
      { href: "/sitemap", text: "CITY SITEMAP" },
      { href: "/all-course-links", text: "ALL COURSES" },
      { href: "/sitemap.xml", text: "SITEMAP" },
      { href: "/privacy", text: "PRIVACY POLICY" },
    ],
  },

  {
    title: "DATA SCIENCE WITH AI",
    links: [
      {
        href: "/advanced-data-analytics-with-generative-ai-course-in-pune",
        text: "Advanced Data Analytics (Azure & Power BI)",
      },
      { href: "/data-science-with-ai-course-in-pune", text: "DATA SCIENCE WITH AI" },

      { href: "/generative-ai-course-in-pune", text: "Generative AI" },
    ],
  },
  {
    title: "DATA VISUALIZATION",
    links: [
      { href: "/data-visualization-with-ai-course-in-pune", text: "Data Visualization with AI" },
      { href: "/power-bi-course-in-pune", text: "POWER BI" },
      { href: "/tableau-course-in-pune", text: "TABLEAU" },
    ],
  },
  {
    title: "HR COURSES",
    links: [
      { href: "/hr-training-course-in-pune", text: "HR TRAINING" },
      { href: "/core-hr-course-in-pune", text: "CORE HR" },
      { href: "/hr-payroll-course-in-pune", text: "HR PAYROLL" },
      { href: "/hr-management-course-in-pune", text: "HR MANAGEMENT" },
      { href: "/hr-generalist-course-in-pune", text: "HR GENERALIST" },
      { href: "/hr-analytics-course-in-pune", text: "HR ANALYTICS" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#182e4a] text-[#ecf0f1] font-sans w-full max-w-[1800px] mx-auto relative">
      <div className="px-10 lg:px-24 flex flex-col">
        {/* Top Section with Logo and Social Icons */}
        <div className="w-full flex justify-between items-center mb-2.5 border-b border-white/10 py-2 gap-4 md:gap-0">
          <div className="w-auto h-auto flex justify-start">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/djdhtkjhn/image/upload/v1784203515/cdots_g3izdp_mkglqs.webp"
                alt="Connecting Dots ERP logo"
                width={190}
                height={90}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="w-[50%] flex justify-start md:justify-end lg:justify-end xl:justify-end gap-2 md:gap-6 lg:gap-4 xl:gap-4">
            {socialLinks.map(({ href, label, icon, hoverClass }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`text-[#ecf0f1] text-lg w-9 h-9 flex items-center justify-center md:bg-white/20 lg:bg-white/20 xl:bg-white/20 rounded-full transition-all duration-300 hover:-translate-y-1 ${hoverClass} hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
              >
                <Icon path={icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Columns 1 & 2 wrapper: India dot-map sits as a background behind both */}
          <div className="lg:col-span-2 relative grid grid-cols-1 lg:grid-cols-2">
            {/* Background layer: India dot-map image */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-80 lg:opacity-50"
              aria-hidden="true"
            >
              {/* Subtle gradient so text stays readable over the brightest part of the map */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#182e4a]/40 via-transparent to-[#182e4a]/60" />
            </div>

            {/* Column 1: SAP S/4 HANA COURSES */}
            <div className="relative z-10">
              <FooterClient sections={[footerSections[0]]} />
            </div>

            {/* it courses for mobile only */}
            <div className="block md:hidden lg:hidden xl:hidden relative z-10">
              <FooterClient sections={[footerSections[1]]} />
            </div>

            {/* Column 2: IT COURSES + ABOUT */}
            <div className="hidden md:flex lg:flex xl:flex relative z-10">
              <FooterClient sections={[footerSections[1], footerSections[2]]} />
            </div>
          </div>

          {/* Column 3: DIGITAL MARKETING + DATA SCIENCE */}
          <div className="lg:col-span-1">
            <FooterClient sections={[footerSections[3], footerSections[4]]} />
          </div>

          {/* Column 4: DATA VISUALIZATION + HR COURSES */}
          <div className="lg:col-span-1">
            <FooterClient sections={[footerSections[5], footerSections[6]]} />
          </div>

          {/* about for mobile only */}
          <div className="block md:hidden lg:hidden xl:hidden relative z-10">
            <FooterClient sections={[footerSections[2]]} />
          </div>

          {/* Column 5: CONTACT US */}
          <div className="lg:col-span-1">
            <div className="mb-2.5">
              <div className="bg-white/5 rounded px-3 py-1.5 h-full">
                <h3 className="text-xs font-semibold uppercase relative pb-2 mb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#3498db]">
                  CONTACT US
                </h3>
                <div className="flex flex-col gap-3">
                  {/* Pune Office */}
                  <div className="pb-3 border-b border-dashed border-white/10">
                    <div className="flex items-start gap-2 mb-1.5">
                      <Icon
                        path={ICONS.map}
                        className="text-[#3498db] text-base min-w-[16px] mt-0.5"
                      />
                      <div>
                        <a
                          href="https://maps.app.goo.gl/DNwzKa2Yt1WB6zUB7"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Pune Office location in Google Maps"
                          className="text-sm font-semibold text-[#5dade2] m-0 mb-1 block text-decoration-none"
                        >
                          Pune Office
                        </a>
                        <p className="m-0 text-xs leading-tight">
                          1st Floor, 101, Police, Wireless Colony, Vishal Nagar,
                          Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra
                          411027
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon
                        path={ICONS.phone}
                        className="text-[#3498db] text-base min-w-[16px]"
                      />
                      <a
                        href="tel:+919004002941"
                        className="text-[#ecf0f1] no-underline text-xs transition-colors hover:text-[#3498db]"
                      >
                        +91 9004002941
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        path={ICONS.phone}
                        className="text-[#3498db] text-base min-w-[16px]"
                      />
                      <a
                        href="tel:+919004002958"
                        className="text-[#ecf0f1] no-underline text-xs transition-colors hover:text-[#3498db]"
                      >
                        +91 9004002958
                      </a>
                    </div>
                  </div>

                  {/* Mumbai Office */}
                  <div className="pb-3 border-b border-dashed border-white/10 last:border-b-0">
                    <div className="flex items-start gap-2 mb-1.5">
                      <Icon
                        path={ICONS.map}
                        className="text-[#3498db] text-base min-w-[16px] mt-0.5"
                      />
                      <div>
                        <a
                          href="https://maps.app.goo.gl/i7W3baVVS1mDLmTJ9"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Mumbai Office 1 location in Google Maps"
                          className="text-sm font-semibold text-[#5dade2] m-0 mb-0.5 block text-decoration-none"
                        >
                          Mumbai Office 1
                        </a>
                        <p className="m-0 text-xs leading-tight">
                          Paradise Tower, next to MCDonalds, Thane West, Thane,
                          Maharashtra 400601
                        </p>
                        <a
                          href="tel:+919004001938"
                          className="text-[#ecf0f1] no-underline text-xs transition-colors hover:text-[#3498db] inline-block mt-1"
                        >
                          +91 9004001938
                        </a>

                        <div className="my-2 border-b border-dashed border-white/10"></div>

                        <a
                          href="https://maps.app.goo.gl/i7W3baVVS1mDLmTJ9"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Mumbai Office 2 location in Google Maps"
                          className="text-sm font-semibold text-[#5dade2] m-0 mb-0.5 block text-decoration-none"
                        >
                          Mumbai Office 2
                        </a>
                        <p className="m-0 text-xs leading-tight mt-1">
                          4th Floor, Ram Niwas, B-404, Gokhale Rd, near
                          McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane,
                          Maharashtra 400602
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        path={ICONS.phone}
                        className="text-[#3498db] text-base min-w-[16px]"
                      />
                      <a
                        href="tel:+919004005382"
                        className="text-[#ecf0f1] no-underline text-xs transition-colors hover:text-[#3498db]"
                      >
                        +91 9004005382
                      </a>
                    </div>

                  </div>

                  {/* Raipur Office */}
                  <div className="pb-3 border-b border-dashed border-white/10 last:border-b-0">
                    <div className="flex items-start gap-2 mb-1.5">
                      <Icon
                        path={ICONS.map}
                        className="text-[#3498db] text-base min-w-[16px] mt-0.5"
                      />
                      <div>
                        <a
                          href="https://www.google.com/maps/place/SAP+Training+Institute+%7C+SAP+Course+In+Raipur+%7C+Software+Testing+%7C+Data+Science+%7C+HR+Courses+in+Raipur+Connecting+Dots+ERP/@21.2188864,81.6051325,14z/data=!4m6!3m5!1s0x3a28dd59226d79f7:0xf4263e6f1707c059!8m2!3d21.2373024!4d81.653947!16s%2Fg%2F11rc3sgv_p?entry=ttu&g_ep=EgoyMDI2MDYyMy4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Raipur Office location in Google Maps"
                          className="text-sm font-semibold text-[#5dade2] m-0 mb-1 block text-decoration-none"
                        >
                          Raipur Office
                        </a>
                        <p className="m-0 text-xs leading-tight">
                          G-54, New Panchsheel Nagar, Civil Lines, Raipur,
                          Chhattisgarh 492001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon
                        path={ICONS.phone}
                        className="text-[#3498db] text-base min-w-[16px]"
                      />
                      <a
                        href="tel:+919004008313"
                        className="text-[#ecf0f1] no-underline text-xs transition-colors hover:text-[#3498db]"
                      >
                        +91 9004008313
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-5 text-center pt-5 border-t border-white/10">
          <p className="m-0 text-xs text-[#95a5a6]">
            &copy; 2026 Connecting Dots ERP. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



