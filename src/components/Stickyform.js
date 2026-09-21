"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const countryCodes = [
  { code: "+1", country: "US", minLength: 10, maxLength: 10 },
  { code: "+91", country: "IN", minLength: 10, maxLength: 10 },
  { code: "+44", country: "GB", minLength: 10, maxLength: 11 },
  { code: "+61", country: "AU", minLength: 9, maxLength: 9 },
  { code: "+81", country: "JP", minLength: 10, maxLength: 11 },
  { code: "+49", country: "DE", minLength: 10, maxLength: 11 },
  { code: "+33", country: "FR", minLength: 9, maxLength: 9 },
  { code: "+86", country: "CN", minLength: 11, maxLength: 11 },
  { code: "+971", country: "AE", minLength: 9, maxLength: 9 },
  { code: "+65", country: "SG", minLength: 8, maxLength: 8 },
];
const hiddenPaths = ['/dashboard', '/superadmin', '/AdminLogin', '/blog', '/blog-admin'];
const getApiBaseUrl = () => (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const OTHER_LOCATION = "Other";
const LOCATIONS = [
  "Pune, Maharashtra", "Mumbai, Maharashtra", "Thane, Maharashtra",
  "Navi Mumbai, Maharashtra", "Hinjewadi, Pune", "Wakad, Pune", "Baner, Pune",
  "Kharadi, Pune", "Andheri, Mumbai", "Bandra, Mumbai", "Powai, Mumbai",
  "Bangalore, Karnataka", "Whitefield, Bengaluru", "Hyderabad, Telangana",
  "Gachibowli, Hyderabad", "Chennai, Tamil Nadu", "Delhi", "Gurugram, Haryana",
  "Noida, Uttar Pradesh", "Ahmedabad, Gujarat", "Jaipur, Rajasthan",
  "Kolkata, West Bengal", "Remote", "Work from Home", "Hybrid",
  OTHER_LOCATION,
];

const COURSES = ["SAP Course", "IT Course", "Data Visualization", "HR Course"];

function getLocationMatches(value) {
  const search = value.trim().toLowerCase();
  if (!search) {
    return [...LOCATIONS.filter((l) => l !== OTHER_LOCATION).slice(0, 9), OTHER_LOCATION];
  }
  const filtered = LOCATIONS.filter((l) => {
    if (l === OTHER_LOCATION) return false;
    const lower = l.toLowerCase();
    return lower.includes(search) || lower.split(",")[0].trim().startsWith(search);
  });
  return [...filtered.slice(0, 9), OTHER_LOCATION];
}

export default function StickyEnrollForm() {
  // --- ALL HOOKS FIRST ---
  const [formData, setFormData] = useState({
    name: "", contact: "", course: "", email: "", location: "", countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const footerRef = useRef(null);

  const pathname = usePathname();
  const isAdminPath = pathname && hiddenPaths.some((path) => pathname.startsWith(path));

  // changing text-color to white 
  const [placement, setPlacement]=useState(false)
  useEffect(()=>{
    setPlacement(pathname==="/placements" || pathname==="/aboutus")
  },[pathname])
  // Find footer element once on mount
  useEffect(() => {
    const footerElement = document.querySelector("footer");
    if (footerElement) footerRef.current = footerElement;
  }, []);

  // Hide the form once the footer scrolls into view (same behavior as before)
  useEffect(() => {
    if (isAdminPath || !footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsFormVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [isAdminPath]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        locationInputRef.current && !locationInputRef.current.contains(e.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CONDITIONAL RETURN MUST COME AFTER ALL HOOKS ---
  if (isAdminPath) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      setFormData((f) => ({ ...f, contact: value.replace(/\D/g, "") }));
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData((f) => ({ ...f, location: value }));
    setIsLocationSelected(false);
    if (errors.location) setErrors((er) => ({ ...er, location: undefined }));
    const matches = getLocationMatches(value);
    setFilteredSuggestions(matches);
    setShowSuggestions(matches.length > 0);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (s) => {
    setFormData((f) => ({ ...f, location: s }));
    setIsLocationSelected(true);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);
    locationInputRef.current?.focus();
  };

  const openLocationDropdown = () => {
    const matches = getLocationMatches(formData.location);
    setFilteredSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  };

  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion((p) => (p < filteredSuggestions.length - 1 ? p + 1 : p));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion((p) => (p > 0 ? p - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeSuggestion >= 0) {
        e.preventDefault();
        handleSuggestionClick(filteredSuggestions[activeSuggestion]);
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode, course, location } = formData;

    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = "Enter a valid email address";

    if (!course) newErrors.course = "Select a course";

    const isValidLocation = LOCATIONS.includes(location) || location === OTHER_LOCATION;
    if (!location.trim()) newErrors.location = "Location is required";
    else if (!isLocationSelected || !isValidLocation)
      newErrors.location = "Select a location from the dropdown";
    else if (location.length > 100) newErrors.location = "Location seems too long";

    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const digits = contact.replace(/\D/g, "");
      const { minLength, maxLength } = selectedCountry;
      if (!digits) newErrors.contact = "Contact number is required";
      else if (digits.length < minLength || digits.length > maxLength)
        newErrors.contact = `Enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number`;
    } else {
      newErrors.contact = "Please select a valid country code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setIsSubmitting(true);

    const submissionData = {
      name: formData.name.trim(),
      contact: formData.contact,
      countryCode: formData.countryCode,
      email: formData.email.trim(),
      coursename: formData.course,
      location: formData.location.trim(),
    };

    try {
      const apiUrl = getApiBaseUrl();
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch(`${apiUrl}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(
          responseData?.message || `Submission failed with status ${response.status}.`
        );
        error.status = response.status;
        error.responseData = responseData;
        throw error;
      }

      alert(responseData.message || "Thank You! Form successfully submitted.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setFormData({ name: "", contact: "", course: "", email: "", location: "", countryCode: "+91" });
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(-1);
      setIsLocationSelected(false);
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "An error occurred while submitting. Please try again.";
      if (error?.responseData?.message) errorMessage = error.responseData.message;
      else if (error?.status) errorMessage = `Submission failed due to a server issue (Status: ${error.status}). Please try again later.`;
      else errorMessage = "Cannot reach the server. Please check your connection.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode);
  const contactPlaceholder = selectedCountry
    ? `Enter ${selectedCountry.minLength === selectedCountry.maxLength ? selectedCountry.minLength : `${selectedCountry.minLength}-${selectedCountry.maxLength}`} digits`
    : "Enter phone number";

  const inputBase =
    "w-full h-9 rounded-md border bg-white px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-emerald-500 disabled:opacity-60";

  if (!isFormVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <style>{`
       .triranga-bg {
  background-color: transparent;
}
      `}</style>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="triranga-bg mx-auto hidden max-w-[1800px] items-end gap-3 rounded-t-xl border-2 border-white/40 p-4 shadow-[0_-2px_18px_rgba(0,0,0,0.2)] backdrop-blur-md md:flex md:flex-wrap"
      >
        {/* Name */}
        <div className="flex min-w-[160px] flex-1 flex-col gap-1">
          <label htmlFor="name" className={`text-xs font-semibold ${placement?'text-white':'text-[#1a1a1a]'}`}>
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="E.g., Ram"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            disabled={isSubmitting}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${errors.name ? "border-red-600" : "border-gray-300"}`}
          />
          {errors.name && <span className="text-[11px] text-red-600">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="flex min-w-[180px] flex-1 flex-col gap-1">
          <label htmlFor="email" className={`text-xs font-semibold ${placement?'text-white':'text-[#1a1a1a]'}`}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E.g., ram@gmail.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            className={`${inputBase} ${errors.email ? "border-red-600" : "border-gray-300"}`}
          />
          {errors.email && <span className="text-[11px] text-red-600">{errors.email}</span>}
        </div>

        {/* Contact */}
        <div className="flex min-w-[200px] flex-1 flex-col gap-1">
          <label htmlFor="contact" className={`text-xs font-semibold ${placement?'text-white':'text-[#1a1a1a]'}`}>
            Contact number <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-2">
            <select
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              disabled={isSubmitting}
              className="h-9 w-20 rounded-md border border-gray-300 bg-white px-1 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {countryCodes.map(({ code, country }) => (
                <option key={code} value={code}>({code}) {country}</option>
              ))}
            </select>
            <input
              id="contact"
              name="contact"
              type="tel"
              inputMode="numeric"
              placeholder={contactPlaceholder}
              value={formData.contact}
              onChange={handleChange}
              maxLength={selectedCountry?.maxLength || 15}
              disabled={isSubmitting}
              aria-invalid={!!errors.contact}
              className={`${inputBase} flex-1 ${errors.contact ? "border-red-600" : "border-gray-300"}`}
            />
          </div>
          {errors.contact && <span className="text-[11px] text-red-600">{errors.contact}</span>}
        </div>

        {/* Course */}
        <div className="flex min-w-[160px] flex-1 flex-col gap-1">
          <label htmlFor="course" className={`text-xs font-semibold ${placement?'text-white':'text-[#1a1a1a]'}`}>
            Course <span className="text-red-600">*</span>
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={!!errors.course}
            className={`${inputBase} ${errors.course ? "border-red-600" : "border-gray-300"}`}
          >
            <option value="" disabled>Select a course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.course && <span className="text-[11px] text-red-600">{errors.course}</span>}
        </div>

        {/* Location */}
        <div className="relative flex min-w-[180px] flex-1 flex-col gap-1">
          <label htmlFor="location" className={`text-xs font-semibold ${placement?'text-white':'text-[#1a1a1a]'}`}>
            Location <span className="text-red-600">*</span>
          </label>
          <input
            ref={locationInputRef}
            id="location"
            name="location"
            type="text"
            autoComplete="off"
            placeholder="E.g., Pune"
            value={formData.location}
            onChange={handleLocationChange}
            onKeyDown={handleLocationKeyDown}
            onFocus={openLocationDropdown}
            maxLength={100}
            disabled={isSubmitting}
            aria-invalid={!!errors.location}
            className={`${inputBase} ${errors.location
              ? "border-red-600"
              : !isLocationSelected && formData.location
                ? "border-amber-500"
                : "border-gray-300"
              }`}
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              role="listbox"
              className="absolute bottom-full left-0 right-0 z-10 mb-1 max-h-44 overflow-y-auto rounded-md border border-gray-300 bg-white p-1 shadow-lg"
            >
              {filteredSuggestions.slice(0, 8).map((s, i) => (
                <button
                  type="button"
                  key={`${s}-${i}`}
                  role="option"
                  aria-selected={i === activeSuggestion}
                  onClick={() => handleSuggestionClick(s)}
                  onMouseEnter={() => setActiveSuggestion(i)}
                  className={`block w-full rounded px-2 py-1.5 text-left text-[13px] ${i === activeSuggestion ? "bg-sky-100 text-sky-700" : "text-gray-800 hover:bg-sky-50"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          {!isLocationSelected && formData.location && !errors.location && (
            <span className="text-[11px] text-amber-700">Select a location from the dropdown.</span>
          )}
          {errors.location && <span className="text-[11px] text-red-600">{errors.location}</span>}
        </div>

        {/* Submit */}
        <div className="flex flex-col">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-9 items-center justify-center gap-2 rounded-md bg-[#010162] px-5 text-sm font-medium text-white transition hover:bg-white-600 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSubmitting && (
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-lg bg-cyan-600/90 px-6 py-3 text-sm font-semibold text-white shadow-lg">
          Thank you for submitting!
        </div>
      )}
    </div>
  );
}
