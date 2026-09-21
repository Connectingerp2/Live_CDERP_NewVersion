// components/CoursesComponents/Header.js

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { countryCodes } from "@/utils/countryCodes";
import styles from "@/styles/CoursesComponents/Header.module.css";
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Download,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Loader2,
} from "lucide-react";

const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
  loading: () => null,
});

const courseOptions = {
  "SAP Functional": [
    "SAP FICO", "SAP Ariba", "SAP MM", "SAP SD", "SAP HR/HCM",
    "SAP PP", "SAP QM", "SAP PM", "SAP PS", "SAP EWM",
    "SAP SCM", "SAP SUCCESSFACTOR", "SAP BTP", "SAP EHS",
    "SAP GRC", "SAP IBP",
  ],
  "SAP Technical": ["SAP ABAP", "SAP S/4 HANA", "SAP BW/BI", "SAP BASIS"],
  "Data Visualization": ["Tableau", "Power BI", "SQL"],
  "Digital Marketing": [
    "Advance Digital Marketing", "Pay Per Click Training",
    "Search Engine Optimization", "Social Media Marketing",
    "Advance Google Analytics Training",
  ],
  "HR Courses": [
    "HR Training", "Core HR", "HR Payroll",
    "HR Management", "HR Generalist", "HR Analytics",
  ],
  "IT Courses": [
    "MASTERS IN DATA ANALYTICS", "MASTERS IN DATA SCIENCE",
    "MASTERS IN BUSINESS ANALYTICS", "Generative AI",
    "Full Stack Training", "JAVA", "Python", "Salesforce",
    "Software Development", "AWS", "Azure", "DevOps", "AIML",
  ],
};

/*
  Same `data` contract as the original:
  { title, subtitle, description, features: [...], alumni: [...],
    buttons: [{ text, courseName? }, ...], form: { title, submitText, inputs: [...] } }
*/

const DSHeader = ({ data }) => {
  const [formData, setFormData] = useState({ countryCode: "+91", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [location, setLocation] = useState("");
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (statusMessage.text) {
      const timer = setTimeout(() => setStatusMessage({ text: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-location-container]")) {
        setShowSuggestions(false);
        setShowCourseDropdown(false);
        setSelectedCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadCities = async () => {
      try {
        const citiesModule = await import("@/data/india-cities.json");
        const cities = citiesModule.default || citiesModule;
        const indianCities = cities.filter(
          (city) => city.country === "IN" || city.country === "India"
        );
        const uniqueLocations = [
          ...new Set(
            indianCities.map((c) => (c.subcountry ? `${c.name}, ${c.subcountry}` : c.name))
          ),
        ].sort();
        if (isMounted) setLocationSuggestions(uniqueLocations);
      } catch (error) {
        console.error("Error loading cities data:", error);
      }
    };
    loadCities();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <p className="text-slate-500">Loading header data...</p>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "contact") {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setIsLocationSelected(false);
    if (value.length > 0) {
      const filtered = locationSuggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      );
      const results = [...filtered.slice(0, 9)];
      if (!results.includes("Other")) results.push("Other");
      setFilteredSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (val) => {
    setLocation(val);
    setIsLocationSelected(true);
    setShowSuggestions(false);
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.contact) {
      setStatusMessage({ text: "Please fill all required fields", type: "error" });
      return false;
    }
    const selectedCountry = countryCodes.find((c) => c.code === formData.countryCode);
    if (!selectedCountry) {
      setStatusMessage({ text: "Invalid country code", type: "error" });
      return false;
    }
    const { minLength, maxLength } = selectedCountry;
    if (formData.contact.length < minLength || formData.contact.length > maxLength) {
      setStatusMessage({
        text: `Phone number for ${selectedCountry.country} must be between ${minLength} and ${maxLength} digits`,
        type: "error",
      });
      return false;
    }
    if (!/^\d+$/.test(formData.contact)) {
      setStatusMessage({ text: "Phone number must contain only digits", type: "error" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatusMessage({ text: "Please enter a valid email address", type: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const isValidLocation = locationSuggestions.includes(location) || location === "Other";
    if (!isValidLocation || !isLocationSelected) {
      setStatusMessage({ text: "Please select a location from dropdown only", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location,
          course: formData.course,
          coursename: data.title,
        }),
      });
      if (!response.ok) throw new Error("Submission failed. Please try again.");
      setStatusMessage({ text: "Form submitted successfully!", type: "success" });
      setFormData({ name: "", email: "", course: "", countryCode: "+91", contact: "" });
    } catch (error) {
      setStatusMessage({ text: error.message || "An error occurred. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const isITTraining = data.buttons?.some((b) => b.courseName === "IT Training Program");
  const featureList = data.features || [];
  const alumni = data.alumni || [];

  return (
    <div className={`${styles.containerItDsHeader} relative isolate overflow-hidden bg-white`}>
      <style jsx global>{`
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, 35px) scale(1.08); }
          50% { transform: translate(-25px, 65px) scale(0.95); }
          75% { transform: translate(-45px, -20px) scale(1.04); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-55px, -30px) scale(1.06); }
          50% { transform: translate(30px, -55px) scale(0.93); }
          75% { transform: translate(55px, 25px) scale(1.03); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.06); }
          66% { transform: translate(-40px, 30px) scale(0.94); }
        }
        @keyframes blobFloatSmall {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(28px, 28px); }
        }
      `}</style>

      {/* Elegant layered background — asymmetric mesh-gradient blobs in the brand navy/teal,
          each drifting continuously along its own path (staggered durations so they never sync),
          a diagonal light sheen, and a dedicated glow seated behind the form card. */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <Image
          src="https://res.cloudinary.com/bropujss/image/upload/c_limit,w_1200,q_auto,f_auto/v1788153580/headerImg_ftsnkg.webp"
          alt="header img"
          width={1200}
          height={705}
          priority
          fetchPriority="high"
          loading="eager"
          quality={70}
          sizes="(max-width: 1200px) 100vw, 1200px"
          className={styles.heroImage}
        />
        {/* top hairline accent */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#010162] via-[#036f85] to-[#010162]" />

        {/* rich diagonal base wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#dbeafe]/55 via-white/45 to-[#dbeafe]/55" />

        {/* organic blob 1 — top right, teal, continuous drift */}
        <div className="absolute -top-28 -right-16 h-[620px] w-[620px] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-[radial-gradient(circle_at_35%_35%,rgba(37,99,235,0.45)_0%,rgba(37,99,235,0.16)_50%,transparent_75%)] blur-2xl motion-safe:animate-[blobFloat1_16s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* organic blob 2 — bottom left, navy, continuous drift */}
        <div className="absolute -bottom-52 -left-36 h-[560px] w-[560px] rounded-[40%_60%_70%_30%/50%_60%_30%_70%] bg-[radial-gradient(circle_at_60%_40%,rgba(29,78,216,0.40)_0%,rgba(29,78,216,0.14)_50%,transparent_75%)] blur-2xl motion-safe:animate-[blobFloat2_20s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* organic blob 3 — center-left accent, softer teal */}
        <div className="absolute top-[28%] left-[28%] h-[380px] w-[380px] rounded-[55%_45%_65%_35%/45%_55%_35%_65%] bg-[radial-gradient(circle,rgba(59,130,246,0.22)_0%,transparent_70%)] blur-2xl motion-safe:animate-[blobFloat3_13s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* small floating accent blob — adds depth near headline */}
        <div className="absolute top-[8%] left-[8%] h-[160px] w-[160px] rounded-[50%_50%_40%_60%/60%_40%_60%_40%] bg-[radial-gradient(circle,rgba(37,99,235,0.18)_0%,transparent_75%)] blur-xl motion-safe:animate-[blobFloatSmall_10s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* diagonal light sheen sweeping the hero */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(3,111,133,0.14)_50%,transparent_65%)]" />

        {/* focused glow seated behind the form card, drifting gently */}
        <div className="absolute right-[3%] top-[12%] hidden h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,rgba(29,78,216,0.16)_50%,transparent_75%)] blur-[70px] lg:block motion-safe:animate-[blobFloatSmall_15s_ease-in-out_infinite] motion-reduce:animate-none" />

        {/* soft radial spotlight behind the headline */}
        <div className="absolute left-[10%] top-[6%] h-[320px] w-[500px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.9)_0%,transparent_70%)] blur-2xl" />

        {/* gentle vignette so edges fade to white */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/65" />
      </div>

      <div className="relative z-20 w-full">
        <div className="flex flex-col items-center gap-14 md:justify-between lg:flex-row lg:items-start lg:gap-12 w-[90%] mx-auto">
          {/* ---------------- LEFT: marketing content ---------------- */}
          <div className="w-full max-w-2xl lg:w-[56%]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#036f85]/20 bg-[#036f85]/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#036f85]">
              <GraduationCap size={14} strokeWidth={2.4} />
              SAP Training &amp; Certification
            </div>

            <h1 className="text-xl font-extrabold leading-[1.2] tracking-tight text-[#0b1130] sm:text-4xl lg:text-[2.4rem]">
              {data.title}  - {data.subtitle}
            </h1>

            {/* {data.subtitle && (
              <h2 className="mt-3 text-lg font-semibold leading-snug text-[#036f85] sm:text-xl">
                {data.subtitle}
              </h2>
            )} */}

            {data.description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
                {data.description}
              </p>
            )}

            {data.buttons?.length > 0 && (
              <div className={`flex flex-wrap items-center gap-4 ${isITTraining ? "mt-6" : "mt-9"}`}>
                {data.buttons.map((button, index) => {
                  const isPrimary = index === 0;
                  const sizeClasses = isITTraining
                    ? "px-4 py-2 text-xs"
                    : "px-6 py-3.5 text-sm";
                  return (
                    <button
                    key={index}
                    onClick={
                      index === 0
                        ? () => {
                            window.open(
                              "https://wa.me/9004002941?text=Hi%20I'm%20interested%20in%20your%20courses.",
                              "_blank"
                            );
                          }
                        : handleButtonClick
                    }
                    className={
                      isPrimary
                        ? `group inline-flex items-center gap-2 rounded-lg bg-[#010162] font-bold text-white shadow-md shadow-[#010162]/15 transition-colors duration-150 hover:bg-[#02024f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#036f85] ${sizeClasses}`
                        : `inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-700 transition-colors duration-150 hover:border-[#036f85] hover:text-[#036f85] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#036f85] ${sizeClasses}`
                    }
                  >
                      {isPrimary ? (
                        <ArrowRight size={16} strokeWidth={2.4} className="order-2 transition-transform duration-150 group-hover:translate-x-0.5" />
                      ) : index==1?(
                        <Download size={16} strokeWidth={2.2} />
                      ):""}
                      <span className={isPrimary ? "order-1" : ""}>{button.text}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ---------------- RIGHT: lead form ---------------- */}
          <div className="w-full max-w-md ml-0 md:ml-[20%] lg:w-[40%]">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-[#010162]/[0.08]">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#010162] to-[#036f85]" />
              <div className="p-6 sm:p-8">
                <h3 className="text-center text-xl font-bold text-[#0b1130]">
                  {data.form?.title}
                </h3>
                <div className="mx-auto mt-2 h-[3px] w-16 rounded bg-gradient-to-r from-[#010162] to-[#036f85]" />

                {statusMessage.text && (
                  <div
                    role="status"
                    className={`mt-4 rounded-lg px-3 py-2 text-sm font-medium ${statusMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                      }`}
                  >
                    {statusMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3.5">
                  {data.form?.inputs?.map((input, index) => {
                    if (input.countryCode) {
                      const selectedCountry = countryCodes.find(
                        (c) => c.code === formData.countryCode
                      );
                      const maxLength = selectedCountry?.maxLength || 10;
                      return (
                        <div key={index} className="flex gap-2">
                          <select
                            id="countryCode"
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-[6.5rem] shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2 text-sm text-slate-700 outline-none focus:border-[#036f85] focus:ring-2 focus:ring-[#036f85]/15"
                          >
                            {countryCodes.map(({ code, country }) => (
                              <option key={code} value={code}>
                                {code} ({country})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id="contact"
                            name="contact"
                            placeholder="Enter phone number"
                            value={formData.contact}
                            onChange={handleChange}
                            maxLength={maxLength}
                            required
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#036f85] focus:ring-2 focus:ring-[#036f85]/15"
                          />
                        </div>
                      );
                    }

                    if (input.name === "location") {
                      return (
                        <div key={index} data-location-container className="relative">
                          <input
                            type="text"
                            name="location"
                            value={location}
                            onChange={handleLocationChange}
                            onFocus={() => filteredSuggestions.length > 0 && setShowSuggestions(true)}
                            placeholder="Enter your location"
                            className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#036f85] focus:ring-2 focus:ring-[#036f85]/15"
                          />
                          {showSuggestions && filteredSuggestions.length > 0 && (
                            <div
                              onPointerDown={(e) => e.stopPropagation()}
                              className="absolute bottom-full left-0 z-50 mb-1.5 max-h-72 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-2xl"
                            >
                              {filteredSuggestions.slice(0, 6).map((suggestion, i) => (
                                <div
                                  key={i}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="cursor-pointer px-4 py-2.5 text-sm text-slate-700 hover:bg-[#036f85]/10 hover:text-[#036f85]"
                                >
                                  {suggestion}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    if (input.type === "course") {
                      return (
                        <div key={index} data-location-container className="relative">
                          <div
                            onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                            className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
                          >
                            <span className={formData.course ? "text-slate-800" : "text-slate-400"}>
                              {formData.course || "Select Course"}
                            </span>
                            {showCourseDropdown ? (
                              <ChevronUp size={16} className="text-slate-400" />
                            ) : (
                              <ChevronDown size={16} className="text-slate-400" />
                            )}
                          </div>

                          {showCourseDropdown && (
                            <div
                              onPointerDown={(e) => e.stopPropagation()}
                              className="absolute bottom-full left-0 z-[999] mb-1.5 max-h-80 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white shadow-2xl"
                            >
                              {!selectedCategory &&
                                Object.keys(courseOptions).map((category) => (
                                  <div
                                    key={category}
                                    onPointerDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSelectedCategory(category);
                                    }}
                                    className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-[#036f85]/10 hover:text-[#036f85]"
                                  >
                                    {category}
                                    <span className="text-slate-400">→</span>
                                  </div>
                                ))}

                              {selectedCategory && (
                                <>
                                  <div
                                    onPointerDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setSelectedCategory(null);
                                    }}
                                    className="flex cursor-pointer items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#036f85] hover:bg-[#036f85]/10"
                                  >
                                    <ChevronLeft size={14} /> Back
                                  </div>

                                  {courseOptions[selectedCategory].map((course) => (
                                    <div
                                      key={course}
                                      onPointerDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setFormData((prev) => ({ ...prev, course }));
                                        setShowCourseDropdown(false);
                                        setSelectedCategory(null);
                                      }}
                                      className="cursor-pointer px-4 py-2.5 text-sm text-slate-700 hover:bg-[#036f85]/10 hover:text-[#036f85]"
                                    >
                                      {course}
                                    </div>
                                  ))}

                                  <div
                                    onPointerDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setFormData((prev) => ({ ...prev, course: "Other" }));
                                      setShowCourseDropdown(false);
                                      setSelectedCategory(null);
                                    }}
                                    className="cursor-pointer px-4 py-2.5 text-sm text-slate-700 hover:bg-[#036f85]/10 hover:text-[#036f85]"
                                  >
                                    Other
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <input
                        key={index}
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        value={formData[input.name] || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                        className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-[#036f85] focus:ring-2 focus:ring-[#036f85]/15"
                      />
                    );
                  })}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#010162] to-[#036f85] px-4 py-3 text-sm font-bold text-white transition duration-150 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting
                      </>
                    ) : (
                      data.form?.submitText
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  );
};

export default DSHeader;