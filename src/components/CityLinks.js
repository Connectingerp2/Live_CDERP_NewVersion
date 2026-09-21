import React from "react";

const cities = [
  "pune", "mumbai", "delhi", "kolkata", "chennai", "bangalore", "hyderabad",
  "ahmedabad", "jaipur", "lucknow", "kanpur", "nagpur", "patna", "indore",
  "bhopal", "visakhapatnam", "vadodara", "ludhiana", "agra", "nashik",
  "rajkot", "varanasi", "kerala", "surat", "dehradun", "madurai", "mysore",
  "pondicherry", "ranchi", "coimbatore", "chandigarh", "bhubaneswar",
  "tirupati", "vizag", "trivandrum", "jalandhar", "mohali", "raipur",
  "cochin", "mangalore", "katraj", "pimpri-chinchwad", "shivaji-nagar",
  "koregaon-park", "viman-nagar", "pimple-saudagar", "baner", "hinjewadi",
  "wakad", "kothrud", "hadapsar", "aundh", "navi-mumbai", "thane",
  "kalyan", "bandra", "andheri", "powai", "worli", "chembur", "malad",
  "vile-parle", "matunga"
];

// Converts "pimpri-chinchwad" -> "Pimpri Chinchwad"
const formatName = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function CityLinks({ courseSlug = "sap" }) {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto overflow-hidden bg-white py-12 px-4">
      <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-wide bg-gradient-to-r from-[#010162] via-[#036f85] to-[#020255] bg-clip-text text-transparent mb-2">
        Available in Your City
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Find our courses near you
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {cities.map((city) => (
          <a
            key={city}
            href={`/${courseSlug}-course-in-${city}`}
            className="relative overflow-hidden rounded-full border border-[rgb(40,144,241)] px-5 py-2.5 text-sm font-semibold text-[rgb(40,144,241)] transition-colors duration-300 ease-out hover:text-white before:absolute before:content-[''] before:top-0 before:bottom-0 before:left-[-5em] before:right-0 before:m-auto before:h-[20em] before:w-[20em] before:rounded-full before:z-0 before:transition-[box-shadow] before:duration-500 before:ease-out hover:before:shadow-[inset_0_0_0_10em_rgb(40,144,241)]"
          >
            <span className="relative z-10">{formatName(city)}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
