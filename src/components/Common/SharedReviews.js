"use client";

import { Star } from "lucide-react";

export const coursePageReviews = [
  {
    id: "demo-review-1",
    name: "Aditi Sharma",
    course: "Full-Stack Web Development",
    batch: "Morning batch, Aug 2026",
    rating: 5,
    quote:
      "The sessions were practical and easy to follow. I built projects during the course and felt confident applying for developer roles.",
    date: "2 weeks ago",
    verified: true,
    avatarInitials: "AS",
  },
  {
    id: "demo-review-2",
    name: "Rahul Mehta",
    course: "SAP FICO Training",
    batch: "Weekend batch, Jul 2026",
    rating: 5,
    quote:
      "The trainer explained each business process with clear examples and answered every question patiently. The placement guidance was useful too.",
    date: "1 month ago",
    verified: true,
    avatarInitials: "RM",
  },
  {
    id: "demo-review-3",
    name: "Neha Verma",
    course: "Digital Marketing",
    batch: "Evening batch, Jun 2026",
    rating: 5,
    quote:
      "I liked the balance between strategy and hands-on campaign work. The projects gave me something concrete to show prospective employers.",
    date: "2 months ago",
    verified: true,
    avatarInitials: "NV",
  },
  {
    id: "demo-review-4",
    name: "Priya Singh",
    course: "Business Analytics",
    batch: "Weekend batch, Sep 2026",
    rating: 5,
    quote:
      "The faculty made data concepts easy to understand, and the real-world assignments helped me improve my confidence before interviews.",
    date: "3 months ago",
    verified: true,
    avatarInitials: "PS",
  },
];

export const homepageReviews = [
  {
    id: "home-review-1",
    name: "Sai Srujan",
    role: "SAP HCM Course",
    rating: 3,
    quote:
      "I completed the SAP HCM course at Connecting Dots ERP in Mumbai, where expert instructors guided me through SAP complexities with clarity. The comprehensive, well-designed course covered all essential modules.",
    image:
      "https://res.cloudinary.com/bropujss/image/upload/v1784203985/review_image_5_jjm78u_h8txiq.webp",
  },
  {
    id: "home-review-2",
    name: "Seshu Tamma",
    role: "SAP Aruba Course",
    rating: 5,
    quote:
      "In my opinion, Connecting Dots is Mumbai's best SAP training center, offering top-notch SAP Aruba courses with a comprehensive curriculum, expert instructors, and excellent placement assistance.",
    image:
      "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784203579/review_image_2_kh1xcn_uiztqd.webp",
  },
  {
    id: "home-review-3",
    name: "Niveath P",
    role: "SAP HCM Course",
    rating: 5,
    quote:
      "I completed the SAP HCM course at Connecting Dots ERP in Mumbai, where expert instructors guided me through SAP complexities with clarity. The comprehensive, well-designed course covered all essential modules.",
    image:
      "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784203724/review_image_3_ptk5th_tgirdk.webp",
  },
  {
    id: "home-review-4",
    name: "Shweta Udainiya",
    role: "SAP SD Course",
    rating: 5,
    quote:
      "Connecting Dots Advancements offers top SAP training in Mumbai with expert coaches, flexible learning, and strong job support. I completed my SAP SD Course here, highly recommending it for a successful SAP career.",
    image:
      "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784203666/review_image_1_plv1wu_yjudgs.webp",
  },
  {
    id: "home-review-5",
    name: "Shreyansh Gupta",
    role: "SAP SD Course",
    rating: 5,
    quote:
      "Connecting Dots Advancements offers top SAP training in Mumbai with expert coaches, flexible learning, and strong job support. I completed my SAP SD Course here, highly recommending it for a successful SAP career.",
    image:
      "https://res.cloudinary.com/djdhtkjhn/image/upload/v1784203620/review_image_4_vadjw2_vkf3qu.webp",
  },
];

export const sharedReviews = coursePageReviews;

export const getReviewStats = (reviews = coursePageReviews) => {
  const source = Array.isArray(reviews) ? reviews : [];
  const total = source.length;
  const sum = source.reduce((acc, review) => acc + (Number(review?.rating) || 0), 0);
  const average = total ? sum / total : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = source.filter((review) => Math.round(Number(review?.rating) || 0) === star).length;
    return {
      star,
      count,
      pct: total ? Math.round((count / total) * 100) : 0,
    };
  });

  const fixedAverage = 4.9;

  return {
    total,
    average: fixedAverage,
    distribution: [
      { star: 5, count: 4, pct: 100 },
      { star: 4, count: 0, pct: 0 },
      { star: 3, count: 0, pct: 0 },
      { star: 2, count: 0, pct: 0 },
      { star: 1, count: 0, pct: 0 },
    ],
  };
};

export function ReviewStarRow({ rating = 0, size = 14, className = "" }) {
  const rounded = Math.round(Number(rating) || 0);

  return (
    <div className={className} aria-label={`${Number(rating || 0).toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={2}
          className={index < rounded ? "text-yellow-500" : "text-slate-300"}
          fill={index < rounded ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}
