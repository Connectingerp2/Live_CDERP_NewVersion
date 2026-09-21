"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "4r3vxTcyxECWaXnhKBGH5g";

/**
 * Loads Google Tag Manager and Ahrefs only after the first user interaction
 * (or a short idle fallback), so their parsing/execution stays off the
 * critical path. dataLayer is created immediately, so any push made before
 * GTM loads is queued and processed as usual.
 */
export default function DeferredAnalytics() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    if (load) return;

    const start = () => setLoad(true);
    const events = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"];
    events.forEach((e) =>
      window.addEventListener(e, start, { passive: true, once: true })
    );
    const fallback = window.setTimeout(start, 5000);

    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.clearTimeout(fallback);
    };
  }, [load]);

  if (!load) return null;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Script
        id="ahrefs-analytics"
        src="/api/ahrefs"
        data-key={AHREFS_KEY}
        strategy="afterInteractive"
      />
    </>
  );
}
