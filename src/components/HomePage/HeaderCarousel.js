"use client";
import React, { useState, useCallback } from 'react';
import dynamic from "next/dynamic";
import CareerHeroSlide from "@/components/HomePage/HeaderCarousel1";

const loadBtnform = () => import("./Btnform");

const Btnform = dynamic(loadBtnform, {
  ssr: false,
  loading: () => (
    <div className="min-h-[560px] w-full rounded-lg bg-white p-5" />
  ),
});

const HeaderCarousel = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = useCallback(() => {
    setShowForm(prev => !prev);
  }, []);

  return (
    <div className="w-full max-w-[1800px] mx-auto overflow-hidden relative">
  <div className="relative bg-white overflow-hidden">
    <div className="w-full h-full">
      <CareerHeroSlide onOpenForm={toggleForm} />
    </div>
  </div>

  {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <Btnform onClose={toggleForm} />
      </div>
    </div>
  )}
</div>
  );
};
 
export default HeaderCarousel;
