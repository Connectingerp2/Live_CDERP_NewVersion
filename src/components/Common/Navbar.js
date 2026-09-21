"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "@/styles/Common/Navbar.module.css";

const AnimatedLogo = dynamic(() => import("../AnimatedLogo"), {
  ssr: false,
  loading: () => <div className={styles.animatedLogoPlaceholder} />,
});

// Each mega-menu (and its ~15-icon data array) now loads as its own chunk,
// only when that specific dropdown is opened — not on initial navbar load.
const SAPMegaMenu = dynamic(() => import("./SAPMegaMenu"), {
  ssr: false,
  loading: () => <li className={styles.sapMenuColumn} />,
});
const ITMegaMenu = dynamic(() => import("./ITMegaMenu"), {
  ssr: false,
  loading: () => <li className={styles.sapMenuColumn} />,
});
const HRMegaMenu = dynamic(() => import("./HRMegaMenu"), {
  ssr: false,
  loading: () => <li className={styles.sapMenuColumn} />,
});

// Custom component definitions
const Navbar = ({ expand, className, children, ref }) => (
  <nav
    className={`${styles.navbar} ${expand
        ? styles[
        `navbarExpand${expand.charAt(0).toUpperCase() + expand.slice(1)}`
        ]
        : ""
      } ${className || ""}`}
    ref={ref}
  >
    {children}
  </nav>
);

const Container = ({ fluid, className, children }) => (
  <div
    className={`${fluid ? styles.containerFluid : styles.container} ${className || ""
      }`}
  >
    {children}
  </div>
);

const Nav = ({ className, children }) => (
  <div className={`${styles.nav} ${className || ""}`}>{children}</div>
);

const Button = ({ className, onClick, children, ...props }) => (
  <button
    className={`${styles.btn} ${className || ""}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    dropdown2: false,
    dropdown3: false,
    dropdown5: false,
    dropdown6: false,
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchMoveX, setTouchMoveX] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [floatingNav, setFloatingNav] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const sidebarWidthRef = useRef(0);

  // Set active link based on current pathname
  useEffect(() => {
    if (pathname) {
      if (pathname.includes("sap-course")) {
        setActiveLink("dropdown2");
      } else if (pathname.includes("it-course")) {
        setActiveLink("dropdown3");
      } else if (
        pathname.includes("data-visualization") ||
        pathname.includes("tableau") ||
        pathname.includes("power-bi") ||
        pathname.includes("sql-course")
      ) {
        setActiveLink("dropdown3");
      } else if (
        pathname.includes("hr-training") ||
        pathname.includes("hr-course")
      ) {
        setActiveLink("dropdown6");
      } else if (pathname.includes("placements")) {
        setActiveLink("placements");
      } else if (pathname.includes("aboutus")) {
        setActiveLink("aboutus");
      } else {
        setActiveLink("");
      }
    }
  }, [pathname]);

  // Enhanced scroll effect for smoother floating navbar transition
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 50);
          setFloatingNav(scrollY > 150);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarVisible(false);
    setMobileOpenDropdown(null);
    document.body.style.overflow = "";
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "";
      sidebarRef.current.style.transform = "";
    }
  }, []);

  // Handle click outside sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.navbarToggler}`)
      ) {
        closeSidebar();
      }
    }

    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSidebarVisible, closeSidebar]);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isSidebarVisible) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible, closeSidebar]);

  // Add effect to manage overlay and body scroll
  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarVisible]);

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarVisible) {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarVisible, closeSidebar]);

  const handleNavClick = useCallback(
    (link) => {
      setActiveLink(link);
      closeSidebar();
    },
    [closeSidebar]
  );

  const handleMouseEnter = useCallback((dropdown) => {
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: true }));
    }
  }, []);

  const handleMouseLeave = useCallback((dropdown) => {
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: false }));
    }
  }, []);

  const handleMobileDropdownToggle = useCallback(
    (dropdown) => {
      if (window.innerWidth < 992) {
        setMobileOpenDropdown(
          mobileOpenDropdown === dropdown ? null : dropdown
        );
      }
    },
    [mobileOpenDropdown]
  );

  // Touch gesture handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchMoveX(e.touches[0].clientX);
    if (sidebarRef.current) {
      sidebarWidthRef.current = sidebarRef.current.offsetWidth;
      sidebarRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (touchStartX === null || !sidebarRef.current) return;
      const currentX = e.touches[0].clientX;
      setTouchMoveX(currentX);

      const deltaX = currentX - touchStartX;
      const sidebarElement = sidebarRef.current;

      if (deltaX > 0) {
        sidebarElement.style.transform = `translateX(${deltaX}px)`;
      } else {
        sidebarElement.style.transform = `translateX(0px)`;
      }
    },
    [touchStartX]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartX === null || !sidebarRef.current) return;
    const sidebarElement = sidebarRef.current;
    const deltaX = touchMoveX - touchStartX;

    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "";
    }

    const threshold = sidebarWidthRef.current * 0.4;

    if (deltaX > threshold) {
      closeSidebar();
    } else {
      sidebarElement.style.transform = `translateX(0px)`;
    }
    setTouchStartX(null);
    setTouchMoveX(null);
  }, [touchStartX, touchMoveX, closeSidebar]);

  // Dropdown render functions
  const renderDropdownSAP = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown2")}
      onMouseLeave={() => handleMouseLeave("dropdown2")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/sap-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${activeLink === "dropdown2" ? styles.active : ""
            }`}
          id="dropdownMenuButton2"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown2");
            } else {
              handleNavClick("/sap-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown2") ||
              (!isMobile && isDropdownVisible.dropdown2)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>SAP S/4 HANA</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown2")}
            aria-label="Toggle SAP menu"
          >
            <span
              className={`${styles.arrow} ${mobileOpenDropdown === "dropdown2"
                  ? styles.arrowUp
                  : styles.arrowDown
                }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown2") ||
        (!isMobile && isDropdownVisible.dropdown2)) && (
          <ul
            className={`${styles.dropdownMenu} ${styles.sapMegaMenu} ${styles.show}`}
            aria-labelledby="dropdownMenuButton2"
          >
            <SAPMegaMenu onItemClick={handleNavClick} />
          </ul>
        )}
    </div>
  );

  const renderDropdownITCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown3")}
      onMouseLeave={() => handleMouseLeave("dropdown3")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/it-course-with-ai-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${activeLink === "dropdown3" ? styles.active : ""
            }`}
          id="dropdownMenuButton3"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown3");
            } else {
              handleNavClick("/it-course-with-ai-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown3") ||
              (!isMobile && isDropdownVisible.dropdown3)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>IT Courses with AI</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown3")}
            aria-label="Toggle IT Courses menu"
          >
            <span
              className={`${styles.arrow} ${mobileOpenDropdown === "dropdown3"
                  ? styles.arrowUp
                  : styles.arrowDown
                }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown3") ||
        (!isMobile && isDropdownVisible.dropdown3)) && (
          <ul
            className={`${styles.dropdownMenu} ${styles.sapMegaMenu} ${styles.itMegaMenu} ${styles.show}`}
            aria-labelledby="dropdownMenuButton3"
          >
            <ITMegaMenu onItemClick={handleNavClick} />
          </ul>
        )}
    </div>
  );

  const renderDropdownHRCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown6")}
      onMouseLeave={() => handleMouseLeave("dropdown6")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/hr-training-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${activeLink === "dropdown6" ? styles.active : ""
            }`}
          id="dropdownMenuButton6"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown6");
            } else {
              handleNavClick("/hr-training-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown6") ||
              (!isMobile && isDropdownVisible.dropdown6)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>HR Courses</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown6")}
            aria-label="Toggle HR Courses menu"
          >
            <span
              className={`${styles.arrow} ${mobileOpenDropdown === "dropdown6"
                  ? styles.arrowUp
                  : styles.arrowDown
                }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown6") ||
        (!isMobile && isDropdownVisible.dropdown6)) && (
          <ul
            className={`${styles.dropdownMenu} ${styles.sapMegaMenu} ${styles.hrMegaMenu} ${styles.show}`}
            aria-labelledby="dropdownMenuButton6"
          >
            <HRMegaMenu onItemClick={handleNavClick} />
          </ul>
        )}
    </div>
  );

  return (
    <>
      <Navbar
        expand="lg"
        className={`${styles.headerNav} ${scrolled ? styles.scrolled : ""} ${floatingNav ? styles.floating : ""
          } ${isTransitioning ? styles.transitioning : ""}`}
        ref={navbarRef}
      >
        <Container fluid className={styles.navContainer}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <AnimatedLogo className={styles.animatedLogo} />
              <div className={styles.logoWrapper}>
                <Image
                  src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                  alt="Logo of Connecting Dots ERP"
                  width={120}
                  height={60}
                  priority
                  className={styles.logoImage}
                  sizes="120px"
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Button */}
          <Button
            className={`${styles.navbarToggler} ${isSidebarVisible ? styles.navbarTogglerOpen : ""
              }`}
            aria-controls="basic-navbar-nav"
            aria-expanded={isSidebarVisible ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <span className={styles.navbarTogglerIcon}></span>
          </Button>

          <Nav className={styles.navbarDesktop}>
            {renderDropdownSAP()}
            {renderDropdownITCourses()}
            {renderDropdownHRCourses()}

            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${activeLink === "placements" ? styles.active : ""
                  }`}
                href="/placements"
                onClick={() => handleNavClick("placements")}
              >
                Placements
              </Link>
            </div>
            <div className={styles.navItem}>
              <Link
                className={`${styles.navLink} ${activeLink === "aboutus" ? styles.active : ""
                  }`}
                href="/aboutus"
                onClick={() => handleNavClick("aboutus")}
              >
                About us
              </Link>
            </div>
            {!floatingNav && (
              <>
                <div className={styles.navAction}>
                  <Link href="/contactus" className={styles.ctaButton}>
                    Contact Us
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar for Smaller Screens with Touch Support */}
      {isSidebarVisible && (
        <>
          <div
            className={`${styles.sidebarOverlay} ${styles.visible}`}
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <aside
            className={`${styles.sidebar} ${styles.visible}`}
            ref={sidebarRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.sidebarHeader}>
              <div className={styles.mobileLogoContainer}>
                <Link
                  href="/"
                  className={styles.mobileLogo}
                  onClick={closeSidebar}
                >
                  <AnimatedLogo className={styles.sidebarLogo} />
                  <Image
                    src="https://res.cloudinary.com/bropujss/image/upload/v1783687070/logo_rju9sa_scdui4.webp"
                    alt="Connecting Dots ERP Logo"
                    width={130}
                    height={100}
                    loading="lazy"
                    sizes="130px"
                  />
                </Link>
              </div>
              <Button
                className={styles.btnClose}
                onClick={closeSidebar}
                aria-label="Close navigation menu"
              />
            </div>

            <Nav className={styles.sidebarNav}>
              {renderDropdownSAP(true)}
              {renderDropdownITCourses(true)}
              {renderDropdownHRCourses(true)}

              <div className={styles.mobileQuickLinks}>
                <Link
                  href="/placements"
                  onClick={() => handleNavClick("placements")}
                  className={`${styles.mobileQuickLink} ${activeLink === "placements"
                      ? styles.mobileQuickLinkActive
                      : ""
                    }`}
                >
                  Placements
                </Link>
                <Link
                  href="/aboutus"
                  onClick={() => handleNavClick("aboutus")}
                  className={`${styles.mobileQuickLink} ${activeLink === "aboutus"
                      ? styles.mobileQuickLinkActive
                      : ""
                    }`}
                >
                  About us
                </Link>

                <Link
                  href="/contactus"
                  onClick={() => handleNavClick("contact")}
                  className={`${styles.mobileQuickLink} ${styles.mobileContactLink}`}
                >
                  Contact Us
                </Link>
              </div>
            </Nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;