export default function HiringBanner() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-10">
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
              WE'RE HIRING
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
              Your next opportunity
              <br />
              starts here.
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed mb-6 max-w-md">
              Join a team shaping the future of ed-tech. We're looking for
              curious, driven people to grow with us — apply today and let's
              build something great together.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
            >
              APPLY NOW
              <span className="text-lg leading-none">→</span>
            </a>
          </div>

          {/* Illustration - using your image from public folder */}
          <div className="flex-shrink-0 w-56 md:w-64">
            <img
              src="/mountain_apply.png"
              alt="Mountain with flag"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}