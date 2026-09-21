"use client";

import Container from "./Container";

const Icon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    viewBox={viewBox}
    width="1em"
    height="1em"
    fill="currentColor"
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
  phone:
    "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.25 1.01l-2.2 2.2Z",
};

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/connectingdotshrcourse",
    label: "Facebook",
    icon: ICONS.facebook,
    hoverClass: "hover:text-[#2563eb]",
  },
  {
    href: "https://wa.me/919004002941",
    label: "WhatsApp",
    icon: ICONS.whatsapp,
    hoverClass: "hover:text-[#22c55e]",
  },
  {
    href: "https://youtube.com/@connectingdotserp?si=hSKEiEg3MdytdEe_",
    label: "YouTube",
    icon: ICONS.youtube,
    hoverClass: "hover:text-[#dc2626]",
  },
  {
    href: "https://in.linkedin.com/in/connecting-dots-erp-043039171",
    label: "LinkedIn",
    icon: ICONS.linkedin,
    hoverClass: "hover:text-[#1d4ed8]",
  },
  {
    href: "https://www.instagram.com/connecting_dots_sap_training?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "Instagram",
    icon: ICONS.instagram,
    hoverClass: "hover:text-[#ec4899]",
  },
];

const CallAdvisorsStrip = () => {
  const advisorsContact = "9004001938";

  return (
    <Container
      className="relative flex items-center h-[38px] overflow-hidden bg-[#182e4a] border-t border-[#050e1b] pt-0 px-0 pb-1 text-[10px] z-40 max-[480px]:h-[42px] max-[480px]:py-0.5 max-[480px]:px-2 max-[480px]:items-center"
    >
      {/* Right side content - Social Icons */}
      <div
        className="absolute top-1/2 right-5 flex justify-end -translate-y-1/2 max-[480px]:right-2 max-[480px]:w-[calc(50%-8px)]"
      >
        <div>
          <div
            className="flex items-center justify-end gap-[0.08rem] max-[480px]:gap-[0.02rem] max-[480px]:w-full max-[480px]:flex-nowrap max-[480px]:justify-end"
          >
            {SOCIAL_LINKS.map(({ href, label, icon, hoverClass }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`inline-flex items-center justify-center w-[38px] h-[38px] text-[1.05rem] text-[#ecf0f1] transition-colors duration-300 max-[480px]:w-6 max-[480px]:h-6 max-[480px]:text-[0.72rem] ${hoverClass}`}
              >
                <Icon path={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Left side content (Call Advisors) */}
      <div
        className="flex items-center gap-[0.35rem] ml-5 min-w-0 pr-[260px] whitespace-nowrap max-[480px]:w-1/2 max-[480px]:ml-0 max-[480px]:pr-2 max-[480px]:gap-[0.12rem] max-[480px]:whitespace-normal max-[480px]:flex-wrap max-[480px]:content-start max-[480px]:leading-[1.05]"
      >
        <span
          className="inline-flex items-center justify-center w-[1.2em] h-[1.2em] mr-1.5 text-[0.95rem] text-[#f3f3f3] max-[480px]:text-[0.68rem] max-[480px]:mr-0.5 max-[480px]:self-start max-[480px]:mt-0.5"
        >
          <Icon path={ICONS.phone} />
        </span>
        <span
          className="font-bold text-white text-[0.88rem] leading-[1.2] max-[480px]:text-[0.6rem] max-[480px]:whitespace-normal max-[480px]:leading-[1.05]"
        >
          Get Free Career Counselling:
        </span>

        <a
          href={`tel:${advisorsContact}`}
          className="font-bold text-[#f7f7f7] text-[0.88rem] leading-[1.2] whitespace-nowrap no-underline max-[480px]:text-[0.6rem] max-[480px]:whitespace-normal max-[480px]:leading-[1.05]"
        >
          {advisorsContact}
        </a>
      </div>
    </Container>
  );
};

export default CallAdvisorsStrip;