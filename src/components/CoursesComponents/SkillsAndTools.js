import { Wrench } from "lucide-react";
import { skillIcons } from "./skillIcons";
import SectionHeading from "./SectionHeading";

function SkillIcon({ name }) {
  const Icon = skillIcons[name] || Wrench;
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm">
      <Icon size={18} strokeWidth={2.2} />
    </div>
  );
}

function SkillCard({ icon, title, description }) {
  return (
    <div className="tile rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60">
      <div className="flex items-center gap-3">
        <SkillIcon name={icon} />
        <p className="text-base font-semibold text-slate-900">{title}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default function SkillsAndTools({ data }) {
  const skills = Array.isArray(data) ? data : [];
  const skillCount = skills.length;

  return (
    <section className="relative overflow-hidden bg-white py-10 max-w-[1800px] mx-auto">
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Skills & Tools You'll Master"
          description="A real, production-grade toolkit, not toy examples. Everything here is what you'll actually touch on the job."
        />

        {/* Stat banner */}
        <div className="dot-grid relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-6 shadow-lg shadow-blue-200 sm:px-10">
          <div className="relative grid grid-cols-2 divide-x divide-white/20 text-center text-white">
            <div className="px-2">
              <p className="text-2xl font-bold sm:text-3xl">{skillCount}</p>
              <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                Skill areas covered
              </p>
            </div>
            <div className="px-2">
              <p className="text-2xl font-bold sm:text-3xl">100%</p>
              <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                Job-ready curriculum
              </p>
            </div>
          </div>
        </div>

        {/* Skill cards, straight from data */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </div>

      <style>{`
        .dot-grid::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
        }

        @keyframes toolFadeIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tile {
          animation: toolFadeIn 0.5s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .tile { animation: none; }
        }
      `}</style>
    </section>
  );
}