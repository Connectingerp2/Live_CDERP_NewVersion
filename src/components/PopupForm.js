"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/PopupForm.module.css";
// import ContactImage_hrf03g from "@/public/ContactImage_hrf03g.webp"

const MAX_VISIBLE_SUGGESTIONS = 10;
const SUGGESTION_ROW_HEIGHT = 40;
const SUGGESTION_SCROLL_OFFSET = 4;

const popupBackgroundImage =
  "https://res.cloudinary.com/duz9xipfm/image/upload/f_auto,q_auto:eco,w_520/v1763383745/c6dadb2c42a8ead53b163c770a60c334_1_g1pufv.avif";

const PopupForm = ({  
  onSubmitData,
  open,
  onClose,
  autoOpen = true,
  showBookmark = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  // Form state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [countryCode] = useState("+91");

  // Location suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [hasFocusedLocation, setHasFocusedLocation] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [isHiddenPage, setIsHiddenPage] = useState(false);

  // Refs
  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const suggestionScrollFrameRef = useRef(null);

  const pathname = usePathname();

  // Course options
  const courseOptions = [
    { value: "", label: "Select a course", disabled: true },
    { value: "SAP Course", label: "SAP Course" },
    { value: "IT Course", label: "IT Course" },
    { value: "Data Visualisation", label: "Data Visualisation" },
    { value: "HR Course", label: "HR Course" },
  ];

  // Load Indian cities and major global cities — deferred until the user
  // actually interacts with the location field, not on popup open. The popup
  // auto-opens on a timer on every page, so loading this on `isVisible` meant
  // nearly every visitor downloaded the full cities dataset whether or not
  // they ever touched this field.
  useEffect(() => {

    if (!hasFocusedLocation || locationSuggestions.length > 0) {
      return;
    }

    let isMounted = true;

    const loadLocationData = async () => {
      try {
        setIsLoadingCities(true);
        const citiesModule = await import("@/data/india-cities.json");
        const cities = citiesModule.default || citiesModule;

        if (!isMounted) return;

        // Filter for Indian cities and major international cities
        const indianCities = cities.filter(
          (city) => city.country === "IN" || city.country === "India"
        );

        // Add major international cities that Indians often mention
        const majorInternationalCities = cities.filter(
          (city) =>
            ["US", "UK", "CA", "AU", "DE", "FR", "SG", "AE", "JP"].includes(
              city.country
            ) && city.population > 500000 // Only major cities
        );

        // Combine and create location strings
        const allLocations = [
          // Indian cities with state (for better clarity)
          ...indianCities.map((city) =>
            city.subcountry ? `${city.name}, ${city.subcountry}` : city.name
          ),
          // Major international cities with country
          ...majorInternationalCities.map(
            (city) => `${city.name}, ${city.country}`
          ),
          // Add common location variations
          "Remote",
          "Work from Home",
          "Multiple Locations",
          "Willing to Relocate",
        ];

        // Remove duplicates, filter out empty values, and sort
        const uniqueLocations = [...new Set(allLocations)]
          .filter((location) => location && location.trim())
          .sort((a, b) => {
            // Prioritize Indian cities (without country suffix)
            const aIsIndian = !a.includes(",") || a.includes("India");
            const bIsIndian = !b.includes(",") || b.includes("India");

            if (aIsIndian && !bIsIndian) return -1;
            if (!aIsIndian && bIsIndian) return 1;

            return a.localeCompare(b);
          });

        console.log(
          `✅ Loaded ${uniqueLocations.length} locations (${indianCities.length} Indian cities)`
        );
        setLocationSuggestions(uniqueLocations);
      } catch (error) {
        console.error("❌ Error loading cities data:", error);
        // Fallback to basic Indian cities if package fails
        setLocationSuggestions([
          "Mumbai, Maharashtra",
          "Delhi",
          "Bangalore, Karnataka",
          "Hyderabad, Telangana",
          "Chennai, Tamil Nadu",
          "Kolkata, West Bengal",
          "Pune, Maharashtra",
          "Ahmedabad, Gujarat",
          "Jaipur, Rajasthan",
          "Surat, Gujarat",
          "Lucknow, Uttar Pradesh",
          "Kanpur, Uttar Pradesh",
          "Nagpur, Maharashtra",
          "Indore, Madhya Pradesh",
          "Thane, Maharashtra",
          "Bhopal, Madhya Pradesh",
          "Visakhapatnam, Andhra Pradesh",
          "Patna, Bihar",
          "Vadodara, Gujarat",
          "Ghaziabad, Uttar Pradesh",
          "Ludhiana, Punjab",
          "Agra, Uttar Pradesh",
          "Nashik, Maharashtra",
          "Faridabad, Haryana",
          "Meerut, Uttar Pradesh",
          "Rajkot, Gujarat",
          "Varanasi, Uttar Pradesh",
          "Srinagar, Jammu and Kashmir",
          "Dhanbad, Jharkhand",
          "Jodhpur, Rajasthan",
          "Amritsar, Punjab",
          "Raipur, Chhattisgarh",
          "Allahabad, Uttar Pradesh",
          "Coimbatore, Tamil Nadu",
          "Jabalpur, Madhya Pradesh",
          "Gwalior, Madhya Pradesh",
          "Vijayawada, Andhra Pradesh",
          "Madurai, Tamil Nadu",
          "Guwahati, Assam",
          "Chandigarh",
          "Hubli, Karnataka",
          "Mysore, Karnataka",
          "Tiruchirappalli, Tamil Nadu",
          "Bareilly, Uttar Pradesh",
          "Aligarh, Uttar Pradesh",
          "Tiruppur, Tamil Nadu",
          "Moradabad, Uttar Pradesh",
          "Jalandhar, Punjab",
          "Bhubaneswar, Odisha",
          "Salem, Tamil Nadu",
          "Warangal, Telangana",
          "Guntur, Andhra Pradesh",
          "Bhiwandi, Maharashtra",
          "Saharanpur, Uttar Pradesh",
          "Gorakhpur, Uttar Pradesh",
          "Bikaner, Rajasthan",
          "Amravati, Maharashtra",
          "Noida, Uttar Pradesh",
          "Jamshedpur, Jharkhand",
          "Bhilai, Chhattisgarh",
          "Cuttack, Odisha",
          "Firozabad, Uttar Pradesh",
          "Kochi, Kerala",
          "Nellore, Andhra Pradesh",
          "Bhavnagar, Gujarat",
          "Dehradun, Uttarakhand",
          "Durgapur, West Bengal",
          "Asansol, West Bengal",
          "Rourkela, Odisha",
          "Nanded, Maharashtra",
          "Kolhapur, Maharashtra",
          "Ajmer, Rajasthan",
          "Akola, Maharashtra",
          "Gulbarga, Karnataka",
          "Jamnagar, Gujarat",
          "Ujjain, Madhya Pradesh",
          "Loni, Uttar Pradesh",
          "Siliguri, West Bengal",
          "Jhansi, Uttar Pradesh",
          "Ulhasnagar, Maharashtra",
          "Jammu, Jammu and Kashmir",
          "Sangli, Maharashtra",
          "Mangalore, Karnataka",
          "Erode, Tamil Nadu",
          "Belgaum, Karnataka",
          "Ambattur, Tamil Nadu",
          "Tirunelveli, Tamil Nadu",
          "Malegaon, Maharashtra",
          "Gaya, Bihar",
          "Jalgaon, Maharashtra",
          "Udaipur, Rajasthan",
          "Maheshtala, West Bengal",
          "Remote",
          "Work from Home",
          "Multiple Locations",
        ]);
      } finally {
        if (isMounted) {
          setIsLoadingCities(false);
        }
      }
    };

    loadLocationData();

    return () => {
      isMounted = false;
    };
  }, [hasFocusedLocation, locationSuggestions.length]);

  useEffect(() => {
    if (open) setIsVisible(true);
  }, [open]);

  useEffect(() => {
    const hiddenPages = [
      "/adminlogin",
      "/dashboard",
      "/blogsadmin",
      "/superadmin",
      "/blog-admin",
      "/blog-admin/users",
    ];

    const currentPath = pathname?.toLowerCase() || "";

    if (hiddenPages.some((page) => currentPath.startsWith(page))) {
      setIsHiddenPage(true); // ← NEW: track hidden page state
      setIsVisible(false);
      return;
    }

    setIsHiddenPage(false); // ← NEW: not a hidden page

    if (!autoOpen) {
      return;
    }

    const showTimer = setTimeout(() => {
      if (!document.body.classList.contains(styles.popupClosedManually)) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [autoOpen, pathname]);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add(styles.noScroll);
      document.body.classList.add("popup-form-open");
    } else {
      document.body.classList.remove(styles.noScroll);
      document.body.classList.remove("popup-form-open");
    }
    return () => {
      document.body.classList.remove(styles.noScroll);
      document.body.classList.remove("popup-form-open");
    };
  }, [isVisible]);

  useEffect(() => {
    let timer;
    if (statusMessage.text) {
      timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [statusMessage]);

  useEffect(() => {
    return () => {
      if (suggestionScrollFrameRef.current) {
        cancelAnimationFrame(suggestionScrollFrameRef.current);
      }
    };
  }, []);

  const scrollSuggestionsToIndex = (index) => {
    if (suggestionScrollFrameRef.current) {
      cancelAnimationFrame(suggestionScrollFrameRef.current);
    }

    suggestionScrollFrameRef.current = requestAnimationFrame(() => {
      if (!suggestionsRef.current) return;
      suggestionsRef.current.scrollTop =
        index <= SUGGESTION_SCROLL_OFFSET
          ? 0
          : (index - SUGGESTION_SCROLL_OFFSET) * SUGGESTION_ROW_HEIGHT;
    });
  };

  // Keyboard navigation avoids scrollIntoView layout reads.
  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;

    const suggestionCount = Math.min(
      filteredSuggestions.length,
      MAX_VISIBLE_SUGGESTIONS
    );
    if (suggestionCount === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = prev < suggestionCount - 1 ? prev + 1 : prev;
          scrollSuggestionsToIndex(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          scrollSuggestionsToIndex(newIndex);
          return newIndex;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;

      case "Tab":
        // Allow tab to move to next field
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;

      case "Home":
        // Jump to first suggestion
        e.preventDefault();
        setActiveSuggestion(0);
        scrollSuggestionsToIndex(0);
        break;

      case "End":
        // Jump to last suggestion
        e.preventDefault();
        const lastIndex = suggestionCount - 1;
        setActiveSuggestion(lastIndex);
        scrollSuggestionsToIndex(lastIndex);
        break;

      case "PageDown":
        // Jump down several items
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = Math.min(prev + 5, suggestionCount - 1);
          scrollSuggestionsToIndex(newIndex);
          return newIndex;
        });
        break;

      case "PageUp":
        // Jump up several items
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = Math.max(prev - 5, 0);
          scrollSuggestionsToIndex(newIndex);
          return newIndex;
        });
        break;
    }
  };

  // Enhanced suggestion click with better feedback
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);

    // Give visual feedback
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  };

  // Add smooth scroll reset when suggestions open
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const valueLower = value.toLowerCase();
      const scoredMatches = [];

      for (const suggestion of locationSuggestions) {
        const suggestionLower = suggestion.toLowerCase();
        const cityName = suggestionLower.split(",")[0].trim();
        let score = -1;

        if (suggestionLower === valueLower) {
          score = 0;
        } else if (suggestionLower.startsWith(valueLower)) {
          score = 1;
        } else if (cityName.startsWith(valueLower)) {
          score = 2;
        } else if (suggestionLower.includes(valueLower)) {
          score = 3;
        }

        if (score > -1) {
          scoredMatches.push({ suggestion, score });
        }
      }

      const filtered = scoredMatches
        .sort(
          (a, b) => a.score - b.score || a.suggestion.localeCompare(b.suggestion)
        )
        .slice(0, MAX_VISIBLE_SUGGESTIONS + 1)
        .map(({ suggestion }) => suggestion);

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);
      scrollSuggestionsToIndex(0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      setStatusMessage({ text: "Name is required.", type: "error" });
      return false;
    }
    if (!email.trim()) {
      setStatusMessage({ text: "Email is required.", type: "error" });
      return false;
    }
    if (!mobile.trim()) {
      setStatusMessage({ text: "Mobile number is required.", type: "error" });
      return false;
    }
    if (!course || course === "") {
      setStatusMessage({
        text: "Please select a course.",
        type: "error",
      });
      return false;
    }
    if (!location.trim()) {
      setStatusMessage({ text: "Location is required.", type: "error" });
      return false;
    }

    if (name.length > 50) {
      setStatusMessage({
        text: "Name should be less than 50 characters.",
        type: "error",
      });
      return false;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      setStatusMessage({
        text: "Please enter a valid 10-digit mobile number.",
        type: "error",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }
    if (location.length > 100) {
      setStatusMessage({ text: "Location seems too long.", type: "error" });
      return false;
    }
    if (!isChecked) {
      setStatusMessage({
        text: "Please accept the terms and conditions.",
        type: "error",
      });
      return false;
    }

    setStatusMessage({ text: "", type: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contact: mobile.replace(/\D/g, ""),
      countryCode: countryCode,
      coursename: course,
      location: location.trim(),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting formData:", formData);

      // Native fetch instead of a dynamically-imported axios — removes the
      // dependency entirely rather than just deferring it.
      const res = await fetch(`${apiUrl}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const err = new Error(data?.message || "Request failed");
        err.status = res.status;
        err.responseData = data;
        throw err;
      }

      console.log("PopupForm submitted successfully:", data);
      setStatusMessage({
        text: data.message || "Registration complete!",
        type: "success",
      });

      if (typeof onSubmitData === "function") {
        onSubmitData(formData);
      }

      setTimeout(() => {
        setName("");
        setMobile("");
        setEmail("");
        setCourse("");
        setLocation("");
        setIsChecked(false);
        setStatusMessage({ text: "", type: "" });
        setIsVisible(false);
        document.body.classList.remove(styles.popupClosedManually);
        if (onClose) onClose();
      }, 2500);

    } catch (error) {
      console.error("--- Error During PopupForm Submission ---");
      console.error("Raw Error Object:", error);

      let alertMessage =
        "An error occurred while submitting. Please try again.";

      if (typeof error?.status === "number") {
        const status = error.status;
        const responseData = error.responseData;
        console.error(`Response Status: ${status}`);
        console.error("Raw Response Data:", responseData);

        if (status === 400) {
          alertMessage =
            responseData?.message ||
            "Submission failed. Please check your input.";
          console.log("Backend 400 message for alert:", alertMessage);
        } else {
          alertMessage = `Submission failed due to a server issue (Status: ${status}). Please try again later.`;
        }
      } else if (error instanceof TypeError) {
        // fetch throws TypeError for network failures (no res.status available)
        alertMessage =
          "Cannot reach the server. Check connection or try again later.";
      } else {
        alertMessage = `Unexpected application error: ${error.message || "Unknown error"}`;
      }
      alert(alertMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual close button click
  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.remove(styles.popupClosedManually);
    if (onClose) onClose();
  };

  // Handle click outside form to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent form container clicks from closing the popup
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  const handleBookmarkClick = () => {
    setIsVisible(true);
  };

  const visibleSuggestions = filteredSuggestions.slice(0, MAX_VISIBLE_SUGGESTIONS);
  const hasMoreSuggestions = filteredSuggestions.length > MAX_VISIBLE_SUGGESTIONS;

  return (
    <>
      {/* ── BOOKMARK TAB ── always visible on non-admin pages when popup is closed */}

      {showBookmark && !isVisible && !isHiddenPage && (
        <button
          className={styles.bookmarkTab}
          onClick={handleBookmarkClick}
          aria-label="Open registration form"
        >
          <svg
            className={styles.envelopeSvg}
            viewBox="0 0 100 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="envShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="42%" stopColor="rgba(255,255,255,0)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="58%" stopColor="rgba(255,255,255,0)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-1 0;1 0;-1 0"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <linearGradient id="envBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              <linearGradient id="envFlap" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>

              <linearGradient id="sideL" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#92400e" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.38" />
              </linearGradient>

              <linearGradient id="sideR" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#92400e" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.38" />
              </linearGradient>
            </defs>

            {/* ── ENVELOPE: wide landscape, unchanged ── */}
            <rect x="7" y="68" width="86" height="50" rx="3"
              fill="url(#envBody)" />
            <path className={styles.envelopeWave}
              d="M8 84 C20 76 31 92 43 84 C55 76 66 92 78 84 C84 80 89 80 92 82 L92 107 C80 112 70 101 58 108 C45 116 34 101 22 108 C15 112 10 111 8 109 Z"
              fill="rgba(255,255,255,0.16)" />
            <path className={styles.envelopeWaveAlt}
              d="M8 94 C21 101 32 86 45 94 C58 102 69 87 82 94 C86 96 90 96 92 95 L92 116 L8 116 Z"
              fill="rgba(255,255,255,0.12)" />
            <rect className={styles.envelopeShimmer}
              x="7" y="68" width="86" height="50" rx="3"
              fill="url(#envShimmer)" />
            <g className={styles.envelopeSparkles}>
              <circle cx="22" cy="78" r="1.4" fill="#fff7ed" />
              <circle cx="76" cy="88" r="1.1" fill="#fffbeb" />
              <circle cx="41" cy="108" r="1" fill="#fff7ed" />
              <circle cx="62" cy="75" r="0.9" fill="#fffbeb" />
            </g>
            <polygon points="7,68 7,118 50,93" fill="url(#sideL)" />
            <polygon points="93,68 93,118 50,93" fill="url(#sideR)" />
            <line x1="7" y1="118" x2="50" y2="93"
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <line x1="93" y1="118" x2="50" y2="93"
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <rect x="7" y="68" width="86" height="50" rx="3"
              fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" />

            {/* ── OPEN FLAP ── */}
            <polygon points="7,68 93,68 50,44"
              fill="url(#envFlap)"
              stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
            <line x1="7" y1="68" x2="50" y2="44"
              stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
            <line x1="93" y1="68" x2="50" y2="44"
              stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
            <line x1="7" y1="68" x2="93" y2="68"
              stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

            {/* ── PAPER: w=52, h=72, center at (50,62), tilt -8deg ── */}
            <g transform="rotate(-8, 50, 62)">
              {/* Shadow */}
              <rect x="24" y="26" width="52" height="72" rx="2"
                fill="rgba(0,0,0,0.18)" transform="translate(1.5,1.5)" />
              {/* Paper body */}
              <rect x="24" y="26" width="52" height="72" rx="2"
                fill="#fff7ed" stroke="#fed7aa" strokeWidth="0.7" />
              {/* Left margin */}
              <line x1="32" y1="26" x2="32" y2="98"
                stroke="#ffedd5" strokeWidth="0.5" />
              {/* REGISTER */}
              <text x="50" y="40" textAnchor="middle"
                fontSize="7" fontWeight="800" letterSpacing="0.6"
                fill="#9a3412" fontFamily="Arial, sans-serif">
                REGISTER
              </text>
              {/* Underline */}
              <line x1="27" y1="43" x2="73" y2="43"
                stroke="#f97316" strokeWidth="0.8" strokeLinecap="round" />
              {/* Ruled lines */}
              <line x1="35" y1="51" x2="72" y2="51"
                stroke="#fdba74" strokeWidth="0.9" strokeLinecap="round" />
              <line x1="35" y1="59" x2="72" y2="59"
                stroke="#fdba74" strokeWidth="0.9" strokeLinecap="round" />
              <line x1="35" y1="67" x2="62" y2="67"
                stroke="#fdba74" strokeWidth="0.9" strokeLinecap="round" />
              {/* Checkmark */}
              <polyline
                className={styles.checkmarkStroke}
                points="35,78 41,85 60,70"
                pathLength="100"
                stroke="#ea580c" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </button>
      )}
      {/* ── POPUP OVERLAY ── only when isVisible */}
      {isVisible && (
        <div className={styles.popupFormOverlay} onClick={handleOverlayClick}>
          <div className={styles.popupContentWrapper} onClick={handleFormClick}>

            {/* LEFT SIDE — Decorative Image Panel */}
            <div className={styles.imageContainer}>
              <img
                // src={ContactImage_hrf03g}
                // srcSet={ContactImage_hrf03g}
                src="/ContactImage_hrf03g.webp"
                srcSet="/ContactImage_hrf03g.webp"
                sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 1024px) 326px, 434px"
                width="434"
                height="542"
                alt="Connecting Dots ERP Courses"
                className={styles.popupImage}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* RIGHT SIDE — Form Panel */}
            <div className={styles.popupFormContainer}>
              <div className={styles.videoBackground} aria-hidden="true">
                <img
                  src={popupBackgroundImage}
                  width="520"
                  height="650"
                  alt="bgImg"
                  className={styles.videoBackgroundImage}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              {/* Enhanced lightning border effect */}
              <div className={styles.lightningBorder}>
                <div className={`${styles.lightningEdge} ${styles.top}`}></div>
                <div className={`${styles.lightningEdge} ${styles.right}`}></div>
                <div className={`${styles.lightningEdge} ${styles.bottom}`}></div>
                <div className={`${styles.lightningEdge} ${styles.left}`}></div>
              </div>

              {/* Close button */}
              <button
                className={styles.closeButton}
                onClick={handleClose}
                disabled={isSubmitting}
                aria-label="Close registration form"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className={styles.headerContainer}>
                <img
                  // src={popupLogo}
                  // srcSet={popupLogoSrcSet}
                  src="/Connecting_Logo_New.webp"
                  srcSet="Connecting_Logo_New.webp"
                  sizes="(max-width: 480px) 28px, (max-width: 1024px) 30px, (min-width: 1280px) 42px, 36px"
                  width="42"
                  height="42"
                  alt="Connecting Dots ERP Logo"
                  className={styles.logo}
                  loading="lazy"
                  decoding="async"
                />
                <h2>Register Now!</h2>
              </div>

              {statusMessage.text && (
                <div
                  id="popup-status"
                  className={`${styles.statusMessage} ${styles[statusMessage.type]}`}
                  role={statusMessage.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {statusMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="popup-name" className={styles.srOnly}>
                  Full name
                </label>
                <input
                  id="popup-name"
                  type="text"
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength="50"
                  disabled={isSubmitting}
                  aria-describedby="popup-status"
                />
                <label htmlFor="popup-email" className={styles.srOnly}>
                  Email address
                </label>
                <input
                  id="popup-email"
                  type="email"
                  placeholder="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-describedby="popup-status"
                />
                <label htmlFor="popup-mobile" className={styles.srOnly}>
                  Mobile number
                </label>
                <input
                  id="popup-mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Mobile Number*"
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) setMobile(value);
                  }}
                  required
                  pattern="\d{10}"
                  maxLength="10"
                  disabled={isSubmitting}
                  aria-describedby="popup-status"
                />

                <label htmlFor="popup-course" className={styles.srOnly}>
                  Select a course
                </label>
                <select
                  id="popup-course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-describedby="popup-status"
                  className={styles.courseSelect}
                >
                  {courseOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className={styles.locationContainer}>
                  <label htmlFor="popup-location" className={styles.srOnly}>
                    Location
                  </label>
                  <input
                    id="popup-location"
                    ref={locationInputRef}
                    type="text"
                    placeholder={
                      isLoadingCities ? "Loading locations..." : "Add your Location*"
                    }
                    value={location}
                    onChange={handleLocationChange}
                    onKeyDown={handleLocationKeyDown}
                    onFocus={() => {
                      if (!hasFocusedLocation) setHasFocusedLocation(true);
                      if (location.length > 0 && filteredSuggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    required
                    maxLength="100"
                    disabled={isSubmitting}
                    aria-describedby="popup-status"
                    autoComplete="off"
                  />

                  {isLoadingCities && (
                    <div className={styles.loadingIndicator}>
                      <span className={styles.loadingSpinner}></span>
                    </div>
                  )}

                  {showSuggestions &&
                    filteredSuggestions.length > 0 &&
                    !isLoadingCities && (
                      <div ref={suggestionsRef} className={styles.suggestionsDropdown}>
                        {visibleSuggestions.map((suggestion, index) => {
                          const isInternational =
                            suggestion.includes(", US") ||
                            suggestion.includes(", UK") ||
                            suggestion.includes(", CA") ||
                            suggestion.includes(", AU") ||
                            suggestion.includes(", DE") ||
                            suggestion.includes(", FR") ||
                            suggestion.includes(", SG") ||
                            suggestion.includes(", AE") ||
                            suggestion.includes(", JP");
                          const isSpecial = [
                            "Remote",
                            "Work from Home",
                            "Multiple Locations",
                            "Willing to Relocate",
                          ].includes(suggestion);

                          return (
                            <div
                              key={`${suggestion}-${index}`}
                              className={`${styles.suggestionItem} ${index === activeSuggestion ? styles.suggestionActive : ""
                                }`}
                              onClick={() => handleSuggestionClick(suggestion)}
                              onMouseEnter={() => setActiveSuggestion(index)}
                            >
                              <span className={styles.suggestionIcon}>
                                {isSpecial ? "💼" : isInternational ? "🌍" : "📍"}
                              </span>
                              <span className={styles.suggestionText}>{suggestion}</span>
                            </div>
                          );
                        })}
                        {hasMoreSuggestions && (
                          <div className={styles.suggestionMore}>
                            Keep typing for more locations...
                          </div>
                        )}
                      </div>
                    )}
                </div>

                <div className={styles.termsCheckbox}>
                  <span>
                    <input
                      type="checkbox"
                      id="popup-terms"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      required
                      disabled={isSubmitting}
                      aria-describedby="popup-status"
                    />
                  </span>
                  <label htmlFor="popup-terms">
                    I hereby accept the{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      terms and conditions
                    </a>{" "}
                    and
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">
                      {" "}privacy policy
                    </a>{" "}
                    of Connecting Dots ERP.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? styles.submitting : ""}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.buttonText}>Registering</span>
                      <span className={styles.buttonLoader}></span>
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;