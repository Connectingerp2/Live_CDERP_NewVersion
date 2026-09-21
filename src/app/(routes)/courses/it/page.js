'use client';

import React from 'react';
import CourseCard from '@/components/BlogsPage/CourseListCard';
import {
  BarChart3, Brain, Cloud, Code, Database, Settings, } from 'lucide-react';

export default function ITCourses() {
  const courses = [
    { icon: Settings, title: "IT Course", slug: "it", iconColor: "text-blue-500" },
    { icon: Cloud, title: "AWS", slug: "aws", iconColor: "text-orange-500" },
    { icon: Cloud, title: "Azure", slug: "azure", iconColor: "text-sky-500" },
    { icon: Settings, title: "DevOps", slug: "devops", iconColor: "text-indigo-500" },
    { icon: Brain, title: "AIML", slug: "ai-ml", iconColor: "text-purple-500" },
    { icon: Code, title: "Full Stack Training", slug: "full-stack", iconColor: "text-green-500" },
    { icon: Code, title: "JAVA", slug: "java", iconColor: "text-red-500" },
    { icon: Code, title: "Python", slug: "python", iconColor: "text-yellow-500" },
    { icon: Cloud, title: "Salesforce", slug: "salesforce", iconColor: "text-cyan-500" },
    { icon: BarChart3, title: "Data Analytics", slug: "data-analytics", iconColor: "text-blue-400" },
    { icon: Database, title: "Data Science", slug: "data-science", iconColor: "text-teal-500" },
  ];

  const hrefFor = (course) => {
    if (course.slug === "full-stack") {
      return "/full-stack-with-ai-course-in-pune";
    }

    return `/${course.slug}-course-in-pune`;
  };

  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden p-8 flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #002A4C, #16588C, #072E4F)' }}>
      <div className="absolute inset-0 bg-[#0a2a43] opacity-90 z-0"></div>
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-4 sm:left-20 w-16 sm:w-24 h-20 sm:h-32 bg-blue-600/20 rounded-lg transform rotate-12 animate-pulse"></div>
        <div className="absolute top-32 right-4 sm:right-32 w-14 sm:w-20 h-10 sm:h-16 bg-blue-500/15 rounded-lg transform -rotate-6 animate-pulse"></div>
        <div className="absolute top-16 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-4 sm:right-20 w-4 sm:w-6 h-4 sm:h-6 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-4 sm:left-16 w-12 sm:w-16 h-16 sm:h-20 bg-blue-600/15 rounded-lg transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 right-4 sm:right-24 w-20 sm:w-28 h-14 sm:h-20 bg-blue-500/20 rounded-lg transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 right-1/3 w-14 sm:w-18 h-18 sm:h-24 bg-blue-600/10 rounded-lg transform rotate-30 animate-pulse"></div>
      </div>
      <div className="relative z-20 max-w-6xl w-full mx-auto">
        <div className="mb-10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: '#0a2a43', boxShadow: '0 8px 32px 0 rgba(10,42,67,0.5)' }}>
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Master IT Skills with Expert-Led Courses</h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-2 max-w-2xl">Explore cloud, DevOps, AI/ML, programming, and analytics courses with hands-on projects and placement-focused learning.</p>
          </div>
          <img
            src="https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp"
            alt="IT Courses"
            className="w-[280px] h-auto rounded-xl shadow-lg"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-8 text-left">IT Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              icon={course.icon}
              title={course.title}
              iconColor={course.iconColor}
              href={hrefFor(course)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
