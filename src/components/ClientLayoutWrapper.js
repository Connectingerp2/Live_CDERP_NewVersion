"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { CityProvider } from "@/context/CityContext";
import { PopupFormProvider, usePopupForm } from "../components/context/Popupformcontext";

// const BackgroundAnimation = dynamic(
//   () => import("@/components/Common/BackgroundAnimation"),
//   {
//     ssr: false,
//     loading: () => null,
//   }
// );

const Chatbot = dynamic(() => import("@/components/Chatbot"), {
  ssr: false,
  loading: () => null,
});

const PopupForm = dynamic(() => import("@/components/PopupForm"), {
  ssr: false,
  loading: () => null,
});

const Stickyform = dynamic(() => import("@/components/Stickyform"), {
  ssr: false,
  loading: () => null,
});

const WaveComponent = dynamic(() => import("@/components/Wave"), {
  ssr: false,
  loading: () => null,
});

const Whatsapp = dynamic(() => import("@/components/Whatsapp"), {
  ssr: false,
  loading: () => null,
});

const Floatingcontact = dynamic(() => import("@/components/Floatingcontact"), {
  ssr: false,
  loading: () => null,
});

const BottomMenu = dynamic(() => import("@/components/BottomMenu"), {
  ssr: false,
  loading: () => null,
});

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
  loading: () => null,
});

const hiddenRoutes = [
  "/dashboard",
  "/AdminLogin",
  "/superadmin",
  "/superadmin/dashboard",
  "/superadmin/users",
  "/superadmin/leads",
  "/superadmin/analytics",
  "/superadmin/activity",
  "/superadmin/audit-logs",
  "/superadmin/roles",
  "/superadmin/settings",
];

const useDeferredRender = (delay = 2000) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let idleId;
    const timerId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setIsReady(true), {
          timeout: 1500,
        });
      } else {
        setIsReady(true);
      }
    }, delay);

    return () => {
      window.clearTimeout(timerId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [delay]);

  return isReady;
};

// Pulled out so it can call usePopupForm() — that hook needs to be inside
// PopupFormProvider, which itself has to sit inside this component's return.
function GlobalPopupForm() {
  const { isPopupOpen, closePopup } = usePopupForm();
  return (
    <Suspense fallback={null}>
      <PopupForm open={isPopupOpen} onClose={closePopup} />
    </Suspense>
  );
}

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [hasUserEngaged, setHasUserEngaged] = useState(false);
  const showFloatingWidgets = useDeferredRender(1800);
  const showLeadWidgets = useDeferredRender(4500);
  const shouldHideComponent = hiddenRoutes.some((path) =>
    pathname?.startsWith(path)
  );

  useEffect(() => {
    document.body.classList.toggle("hide-footer", shouldHideComponent);
  }, [shouldHideComponent]);

  useEffect(() => {
    const markEngaged = () => setHasUserEngaged(true);
    const interactionEvents = ["pointerdown", "keydown", "scroll", "touchstart"];

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, markEngaged, {
        passive: true,
        once: true,
      });
    });

    const fallbackTimer = window.setTimeout(() => {
      setHasUserEngaged(true);
    }, 7000);

    return () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, markEngaged);
      });
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    const delayedPing = setTimeout(() => {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (apiBaseUrl) {
        fetch(`${apiBaseUrl}/api/ping`).catch((error) => {
          console.warn("API ping failed:", error);
        });
      }
    }, 5000);

    const delayedBlogPing = setTimeout(() => {
      const blogBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (blogBaseUrl) {
        fetch(`${blogBaseUrl}/api/blogs/ping`).catch((error) => {
          console.warn("Blog ping failed:", error);
        });
      }
    }, 6000);

    return () => {
      clearTimeout(delayedPing);
      clearTimeout(delayedBlogPing);
    };
  }, []);

  return (
    <CityProvider>
      <PopupFormProvider>
        {children}

        {showFloatingWidgets && (
          <>
            <ScrollToTop />
            <Floatingcontact phoneNumber="+919004002958" />
            <Whatsapp phoneNumber="+919004002958" />
            <BottomMenu />

            {hasUserEngaged && (
              <Suspense fallback={null}>
                <Chatbot />
              </Suspense>
            )}
          </>
        )}

        {showLeadWidgets && hasUserEngaged && (
          <>
            <Suspense fallback={null}>
              <Stickyform />
            </Suspense>

            <GlobalPopupForm />
          </>
        )}
      </PopupFormProvider>
    </CityProvider>
  );
}