// src/app/layout.js
import { Lato, Rubik, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

// import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import ServerPing from "@/components/ServerPing";

import ConditionalAuthProvider from "@/app/conditionalprovider";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Navbar2 from "@/components/Common/Navbar2";
import WaveComponent from "@/components/Wave";
import DeferredAnalytics from "@/components/DeferredAnalytics";
// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-rubik",
});


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-bricolage",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";

// Verification metadata (kept here as it's typically site-wide)
//new ahref added
export const metadata = {
  verification: {
    google: "KRKFsO9AAW2a8qImif8Wj4uzzjmWGA0R6o7IZFJcmPo",
    other: {
      "ahrefs-site-verification":
        "4070e6d7714dfaee0c76bc5ff82e1a124b5fccc37316e2b02ff78d8560fac756",// new code
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${rubik.variable} ${bricolage.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />


        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msvalidate.01" content="9ACF89BD41333B26F8C154D46FDD8E5D" />
      </head>
      <body className={`body bg-black`}>
        {/* GTM noscript fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* Optional Server Ping */}
        {process.env.NEXT_PUBLIC_ENABLE_PING === "true" && <ServerPing />}
        {/* <BackgroundAnimation />  */}
        {/* Static Components */}
        <CallAdvisorsStrip />
        <Navbar2 />
        <Marquee />

        {/* Client-Side Wrapper */}
        <ConditionalAuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ConditionalAuthProvider>

        <div className="app-footer">
          <WaveComponent/>
          <Footer />
        </div>


        {/* GTM, Meta Pixel and Ahrefs: loaded after the first interaction
            so they stay off the critical rendering path. */}
        <DeferredAnalytics />
      </body>
    </html>
  );
}
