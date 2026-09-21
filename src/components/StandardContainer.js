import React from "react";

/* ============================================================
   Container
   A simple max-width wrapper to keep every section's content
   aligned to the same width across the page.

   Usage:
     <Container>
       <StatsSection />
     </Container>

   - `as`        : element to render as (default "div")
   - `className` : extra classes merged on, e.g. custom padding
   - any other prop (id, aria-*, onClick, etc.) is passed through
   ============================================================ */

export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`max-w-[1800px] mx-auto w-full${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}