"use client";

import React, { useState, useEffect } from "react";
import Btnform from "@/components/HomePage/Btnform";
import SyllabusCard from "./SyllabusCard";
import SectionHeading from "./SectionHeading";

// SapModComponent receives data prop directly from parent
const SapModComponent = ({ data }) => {
  const [curriculum, setCurriculum] = useState([]);
  const [stats, setStats] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);
  const [cardPopStates, setCardPopStates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Transform data when the data prop changes
  useEffect(() => {
    if (!data) return;

    // Transform curriculum data
    let transformedCurriculum = [];

    // Check different data structures for curriculum
    if (data.overview?.modules && Array.isArray(data.overview.modules)) {
      // Standard sapMod structure
      transformedCurriculum = data.overview.modules.map((mod) => ({
        title: mod.name,
        labelColor: "bg-lime-300",
        duration: mod.duration || "1-2 weeks",
        topics: mod.subtopics || [], // Changed from topics to subtopics
      }));
    } else if (data.modules && Array.isArray(data.modules)) {
      // Direct modules structure (your JSON format)
      transformedCurriculum = data.modules.map((mod) => ({
        title: mod.name,
        labelColor: "bg-lime-300",
        duration: mod.duration || "1-2 weeks",
        topics: mod.subtopics || [], // Use subtopics from your JSON
      }));
    } else if (
      data.modules &&
      Array.isArray(data.modules) &&
      data.modules[0]?.title &&
      Array.isArray(data.modules[0]?.subtopics)
    ) {
      // Alternative modules structure with subtopics
      transformedCurriculum = data.modules.map((mod) => ({
        title: mod.title,
        labelColor: "bg-lime-300",
        duration: mod.duration || "1-2 weeks",
        topics: Array.isArray(mod.subtopics) ? mod.subtopics : [],
      }));
    } else if (
      data.modules &&
      Array.isArray(data.modules) &&
      typeof data.modules[0] === "string"
    ) {
      // Simple string modules
      transformedCurriculum = data.modules.map((title) => ({
        title,
        labelColor: "bg-lime-300",
        duration: "1-2 weeks",
        topics: [],
      }));
    }

    setCurriculum(transformedCurriculum);

    // Transform stats data from features
    const features = data.features || [];
    const transformedStats = features.map((feature) => ({
      value: feature.label,
      label: feature.description,
      icon: feature.description?.toLowerCase().includes("languages") ? (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="12" fill="#e3eaf2" />
          <path
            d="M12 7v10m5-5H7"
            stroke="#4a90e2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="12" fill="#e3eaf2" />
          <path
            d="M12 8v4l3 3"
            stroke="#4a90e2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    }));

    setStats(transformedStats);
    setCardPopStates(Array(transformedCurriculum.length).fill(false));
    setOpenIdx(0);
  }, [data]);

  // Card animation effect
  useEffect(() => {
    if (curriculum.length > 0) {
      let timeouts = [];
      for (let i = 0; i < curriculum.length; i++) {
        timeouts.push(
          setTimeout(() => {
            setCardPopStates((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 120)
        );
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [curriculum]);

  // Form handling (simplified like Counselor component)
  const handleDownloadBrochureClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setShowForm(false);

    // After form submission, download file
    setTimeout(() => {
      if (data && data.downloadLink) {
        const link = document.createElement("a");
        link.href = data.downloadLink;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Download link is not available.");
      }
    }, 1000);
  };

  // No data state
  if (!data) {
    return (
      <div className="w-full bg-[#2d2d2d] mb-16 sm:mb-20 lg:mb-24">
        <div className="flex items-center justify-center py-16">
          <div className="text-white text-xl text-center">
            No SAP Modules data available (check masterData.js or prop passing).
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-[600px] bg-white">
        <div className="text-center mb-4 sm:mb-14 md:mb-0">
          <div className="relative z-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-950 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
              Syllabus
            </h2>
            <div className="w-20 h-1 mx-auto bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-4"></div>
          </div>
        </div>

        {/* new syllabus card */}
        <SyllabusCard data={data} curriculum={curriculum} />

        {/* Mobile Download Brochure button */}
        <div className="flex sm:hidden w-full justify-center items-center mt-6 mb-4">
          <button
            onClick={handleDownloadBrochureClick}
            className="font-bold rounded-full py-3 px-6 transition-all duration-200 flex items-center justify-center gap-2 text-base mx-auto shadow-lg border-0 bg-[#091327] text-white"
            style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)" }}
          >
            Download Brochure
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M16 3v4M8 3v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Note section */}
        {data.note && (
          <div className="w-full max-w-6xl mt-8 text-center">
            <p
              className="text-white text-sm"
              dangerouslySetInnerHTML={{
                __html: data.note.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        )}
      </div>

      {/* Simple Form Connection (same as Counselor component) */}
      {showForm && (
        <Btnform onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thank you! Download will start shortly.
          </div>
        </div>
      )}
    </div>
  );
};




export default SapModComponent;