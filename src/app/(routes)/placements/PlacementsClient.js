"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Btnform from "@/components/HomePage/Btnform";
const PopupForm = dynamic(() => import("@/components/PopupForm"), {
  ssr: false,
  loading: () => null,
});


// ─── DATA ────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: "98%", label: "Placement Rate" },
  { value: "₹6 LPA", label: "Avg. Package" },
  { value: "₹24 LPA", label: "Highest Package" },
  { value: "100+", label: "Hiring Partners" },
];


const placementSteps = [
  { step: "01", icon: "🎓", title: "Training", desc: "Learn SAP and IT skills through structured live sessions, practical assignments, and real-world implementation scenarios." },
  { step: "02", icon: "🛠️", title: "Project Scenarios", desc: "Work on real-time SAP project scenarios and business use cases to gain practical implementation experience." },
  { step: "03", icon: "🧠", title: "Technical & HR Mocks", desc: "Prepare for technical and HR interviews through mock sessions with expert feedback and confidence-building practice." },
  { step: "04", icon: "📝", title: "Resume & LinkedIn", desc: "ATS-optimised resume helped by HR team with LinkedIn profile revamp to attract 10× more recruiters." },
  { step: "05", icon: "🤝", title: "Experience Alteration", desc: "Our unique offering helps you apply for jobs with relevant experience, enhancing your resume and boosting hiring chances." },
  { step: "06", icon: "🏆", title: "100% Job Assistance", desc: "Get 100% job assistance with expert training, resume building, mock interviews & 100% placement support at our top-rated training institute." },
];

const partners = [
  { name: "Accenture", abbr: "Ac", color: "#4285F4" },
  { name: "Kohler", abbr: "Kh", color: "#38BDF8" },
  { name: "Boston Byte", abbr: "Bb", color: "#60A5FA" },
  { name: "Aruba", abbr: "Ar", color: "#2874F0" },
  { name: "Big Binary", abbr: "Bg", color: "#818CF8" },
  { name: "Godrej", abbr: "Gd", color: "#528FF0" },
  { name: "Cummins", abbr: "Cm", color: "#7DD3FC" },
  { name: "Home Lane", abbr: "Hl", color: "#94A3B8" },
  { name: "IBM", abbr: "Ib", color: "#A78BFA" },
  { name: "Wipro", abbr: "Wi", color: "#60A5FA" },
  { name: "Bharat Agri", abbr: "Ba", color: "#818CF8" },
  { name: "HDFC", abbr: "Hf", color: "#34D399" },
  { name: "Monginis", abbr: "Mn", color: "#38BDF8" },
  { name: "TCS", abbr: "TC", color: "#7DD3FC" },
  { name: "GNS", abbr: "Gn", color: "#93C5FD" },
  { name: "Eatfit", abbr: "Ef", color: "#0EA5E9" },
  { name: "Firstcry", abbr: "Fc", color: "rgb(206, 124, 231)" },
  { name: "Caprium", abbr: "Cp", color: "#a4ef7c" },
  { name: "MoneyTap", abbr: "Mt", color: "#aa74e8" },
  { name: "Boston Byte", abbr: "Bb", color: "#f0748f" },
  { name: "Airmeet", abbr: "Am", color: "#b1ddf2" },
  { name: "John deere", abbr: "Jd", color: "#25a390" },


];

const testimonials = [
  { name: "Barde", role: "SAP MM Consultant @ 🏢 Infosys", text: "Connecting Dots ERP gave me real-time project experience that no other institute offered. Within 3 months of training, I was placed at Infosys. The mock interviews were exactly like the real ones!.", rating: 5, initials: "RB", color: "#38BDF8" },
  { name: "Vishal", role: "SAP SD Consultant @ 🏢 Coreflex Solutions", text: "I was from a commerce background with no prior knowledge of SAP. The SAP SD trainers explained every concept from scratch very patiently. Their interview preparation and CV support helped me clear interviews confidently and get placed as an SAP SD Consultant.", rating: 5, initials: "VD", color: "#818CF8" },
  { name: "Shubham", role: "SAP FICO Counsultant @ 🏢 Deloitte", text: "The Global Certification from CD ERP is recognised globally. I got multiple offers after clearing the SAP exam. The server access for 4 months post-training helped me practice daily.", rating: 5, initials: "SS", color: "#34D399" },
];

const featuredPlacements = [
  {
    name: "Preetesh Pardeshi",
    salary: "24 LPA",
    course: "SAP ABAP",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183508/agconsultancy_rvgaxq_qpcprn.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784182429/pic1pp_wtvqhw_gv9ejf.webp",
  },
  {
    name: "Nikhilesh Landge",
    salary: "12 LPA",
    course: "SAP SD",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183410/cltech_xqeelh_kszm7t.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784182533/pic2pp_ugfo1w_dtaotf.webp",
  },
  {
    name: "Shubham Desale",
    salary: "9 LPA",
    course: "SAP MM",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183207/deloitte1_luqjwi_xzad79.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784182641/pic3pp_xgown1_xcqm3q.webp",
  },
  {
    name: "Nitesh Kumar",
    salary: "15 LPA",
    course: "SAP FICO",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183045/marketlegos_asz8ud_e7zifc.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784182727/pic4pp_v0iqs4_nt8vb1.webp",
  },
  {
    name: "Seshu Tamma",
    salary: "11 LPA",
    course: "SAP Security",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183207/deloitte1_luqjwi_xzad79.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784182811/pic5pp_vllliw_h7zsmn.webp",
  },
  {
    name: "Sai Srujan",
    salary: "18 LPA",
    course: "SAP FICO",
    logo: "https://res.cloudinary.com/bropujss/image/upload/v1784183207/deloitte1_luqjwi_xzad79.avif",
    photo: "https://res.cloudinary.com/bropujss/image/upload/v1784203985/review_image_5_jjm78u_h8txiq.webp",
  },
];

const faqs = [
  { q: "What is the placement guarantee?", a: "We offer a 100% placement assistance guarantee. If you complete all milestones and don't get placed within 6 months of graduation, we refund your course fee in full." },
  { q: "How long does placement take after course completion?", a: "On average, our students receive their first offer within 45–60 days of completing the program. 80% of students are placed within 3 months." },
  { q: "Do you help with placements too?", a: "Yes! Our 100% placement support covers direct referrals to 100+ off-campus hiring partners across startups and MNCs." },
  { q: "Is there a minimum package guaranteed?", a: "We work hard to match you to roles that match your skill level. Our average package is ₹6 LPA, and we don't stop supporting you until you're placed." },
  { q: "Can working professionals join the placement program?", a: "Absolutely. We have a dedicated upskilling + lateral placement track for professionals with 1–5 years of experience looking to switch roles or companies." },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function PlacementPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [count1, setCount1] = useState(0);
  const statsRef = useRef(null);
  const counted = useRef(false);
  const alumniRef = useRef(null);
  const [placedStudents, setPlacedStudents] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showBtnForm, setShowBtnForm] = useState(false);
  const [showPopupForm, setShowPopupForm] = useState(false);

  useEffect(() => {
    fetch("/Jsonfolder/placementsData.json")
      .then(res => res.json())
      .then(data => setPlacedStudents(data.placedSection.placements));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          let start = 0;
          const end = 98;
          const timer = setInterval(() => {
            start += 2;
            setCount1(start);
            if (start >= end) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {showBtnForm && <Btnform onClose={() => setShowBtnForm(false)} />}
      <PopupForm
        open={showPopupForm}
        onClose={() => setShowPopupForm(false)}
        autoOpen={false}
        showBookmark={false}
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:      #030D1A;
          --bg2:     #061424;
          --surf:    #0C1E35;
          --surf2:   #112540;
          --blue:    #38BDF8;
          --blue2:   #7DD3FC;
          --blue3:   #0EA5E9;
          --text:    #EFF6FF;
          --muted:   #6A90B0;
          --border:  rgba(56,189,248,0.14);
          --green:   #34D399;
          --red:     #F87171;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          font-family: var(--font-bricolage), 'Segoe UI', sans-serif;
          color: var(--text);
          overflow-x: hidden;
        }

        /* ─── SHARED BUTTONS ─────────────────────────── */
        .btn-blue {
          background: linear-gradient(135deg, #38BDF8, #0EA5E9);
          color: #030D1A;
          border: none;
          padding: 15px 32px;
          border-radius: 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all .25s;
          box-shadow: 0 8px 28px rgba(56,189,248,.35);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .btn-blue:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(56,189,248,.5); }

        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid rgba(255,255,255,.14);
          padding: 15px 32px;
          border-radius: 10px;
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all .25s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .btn-outline:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }

        /* ─── SECTION COMMON ─────────────────────────── */
        .section {
          padding: 90px 60px;
          max-width: 1360px;
          margin: 0 auto;
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--blue);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .section-label::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: var(--blue);
          border-radius: 2px;
        }

        .section-title {
          font-size: clamp(32px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.08;
          margin-bottom: 16px;
        }
        .section-title .accent  { color: var(--blue); }
        .section-title .outline { -webkit-text-stroke: 1.5px var(--blue); color: transparent; }

        .section-sub {
          font-size: 16px;
          color: var(--muted);
          max-width: 520px;
          line-height: 1.75;
          font-weight: 300;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-10px); }
        }
        @keyframes marqueeL {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.5; transform:scale(1.5); }
        }

        /* ════════════════════════════════════════════
           HERO
        ════════════════════════════════════════════ */
        .hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-radial {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 65% 50%, rgba(56,189,248,.09) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 15% 80%, rgba(14,165,233,.06) 0%, transparent 60%);
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(56,189,248,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.04) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .hero-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1360px; margin: 0 auto;
          padding: 120px 60px 80px;
          display: grid;
          grid-template-columns: 1fr 460px;
          gap: 60px;
          align-items: center;
        }

        /* eyebrow */
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(56,189,248,.1);
          border: 1px solid rgba(56,189,248,.3);
          color: var(--blue2);
          padding: 7px 18px; border-radius: 100px;
          font-size: 12px; font-weight: 600; letter-spacing: 1px;
          text-transform: uppercase; margin-bottom: 26px;
          animation: fadeUp .6s ease both;
        }
        .eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green);
          animation: pulse 2s infinite;
        }

        /* title */
        .hero-title {
          font-size: clamp(44px, 5.5vw, 78px);
          font-weight: 700;
          line-height: 1.03;
          letter-spacing: -2.5px;
          margin-bottom: 22px;
          animation: fadeUp .7s ease .1s both;
        }
        .hero-title .accent  { color: var(--blue); }
        .hero-title .outline { -webkit-text-stroke: 1.5px var(--blue); color: transparent; }

        .hero-sub {
          font-size: 17px; line-height: 1.75; color: var(--muted);
          max-width: 500px; margin-bottom: 40px; font-weight: 300;
          animation: fadeUp .7s ease .2s both;
        }

        .hero-actions {
          display: flex; gap: 14px; flex-wrap: wrap;
          margin-bottom: 24px;
          animation: fadeUp .7s ease .3s both;
        }

        /* stat strip */
        .hero-stats {
          display: flex; flex-wrap: wrap; gap: 0;
          animation: fadeUp .7s ease .4s both;
        }
        .hs-item {
          flex: 1; min-width: 110px;
          padding: 18px 20px 18px 0;
          border-right: 1px solid var(--border);
          margin-right: 20px;
        }
        .hs-item:last-child { border-right: none; margin-right: 0; }
        .hs-val  { font-size: 30px; font-weight: 700; color: var(--blue); line-height: 1; margin-bottom: 5px; }
        .hs-label{ font-size: 12px; color: var(--muted); font-weight: 400; }

        /* ── hero visual ── */
        .hero-visual {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 60px 40px 20px;
          animation: fadeUp .8s ease .2s both;
        }

        .orbit-ring {
          width: 400px; height: 400px; border-radius: 50%;
          border: 2px solid rgba(56,189,248,.25);
          position: relative; display: flex; align-items: center; justify-content: center;
          animation: spinSlow 28s linear infinite;
        }
        .orbit-dot {
          position: absolute; width: 10px; height: 10px; border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }
        .orbit-dot:nth-child(1){ top:-5px;   left:50%; transform:translateX(-50%); color:var(--blue);  background:var(--blue);  }
        .orbit-dot:nth-child(2){ bottom:-5px;left:50%; transform:translateX(-50%); color:var(--blue2); background:var(--blue2); }
        .orbit-dot:nth-child(3){ left:-5px;  top:50%;  transform:translateY(-50%); color:var(--green); background:var(--green); }
        .orbit-dot:nth-child(4){ right:-5px; top:50%;  transform:translateY(-50%); color:#F472B6;      background:#F472B6;      }

        .grad-circle {
          width: 330px; height: 330px; border-radius: 50%;
          border: 1px solid rgba(56,189,248,.18);
          position: relative; overflow: hidden;
          animation: spinSlow 28s linear infinite reverse;
        }
        .halftone {
          position: absolute; right:0; top:0; width:55%; height:100%;
          border-radius: 0 50% 50% 0;
          background-image: radial-gradient(circle, rgba(56,189,248,.32) 1.5px, transparent 1.5px);
          background-size: 12px 12px;
        }

        /* floating info badges */
        .vbadge {
          position: absolute;
          background: rgba(6,20,36,.92);
          border: 1px solid rgba(56,189,248,.22);
          border-radius: 14px; padding: 12px 16px;
          backdrop-filter: blur(18px);
          box-shadow: 0 16px 48px rgba(0,0,0,.45);
          z-index: 10;
        }
        .vbadge-1 { top: 20px;  right: -20px; animation: floatY 4.5s ease-in-out infinite 0s;   }
        .vbadge-2 { bottom: 55px; left: -40px; animation: floatY 4.5s ease-in-out infinite -2s;  }
        .vbadge-3 { top: 44%;   right: -55px; animation: floatY 4.5s ease-in-out infinite -1s;  }

        .vb-row  { display:flex; align-items:center; gap:10px; }
        .vb-icon { font-size:20px; }
        .vb-title{ font-size:13px; font-weight:600; color:var(--text); }
        .vb-sub  { font-size:11px; color:var(--muted); margin-top:2px; }
        .vb-val  { font-size:20px; font-weight:700; color:var(--blue); }

        /* ════════════════════════════════════════════
           MARQUEE
        ════════════════════════════════════════════ */
        .mq-wrap {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 13px 0;
          background: var(--bg2);
        }
        .mq-track {
          display: flex; width: max-content;
          animation: marqueeL 28s linear infinite;
        }
        .mq-track.rev { animation-direction: reverse; }
        .mq-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 28px;
          font-size: 12px; font-weight: 500; color: var(--muted);
          text-transform: uppercase; letter-spacing: .6px; white-space: nowrap;
        }
        .mq-dot { width:5px; height:5px; border-radius:50%; background:var(--blue); flex-shrink:0; }
        .mq-dot.red { background: var(--red); }

        /* ════════════════════════════════════════════
           PLACED STUDENTS
        ════════════════════════════════════════════ */
        .placed-bg {
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .students-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 18px;
          margin-top: 48px;
        }

        .sc {
          background: var(--surf);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px;
          position: relative; overflow: hidden;
          transition: all .3s;
          cursor: pointer;
        }
        .sc::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(56,189,248,.06) 0%, transparent 60%);
          opacity: 0; transition: opacity .3s;
        }
        .sc:hover { border-color: rgba(56,189,248,.4); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,.4); }
        .sc:hover::before { opacity: 1; }

        .sc-top   { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .sc-avatar{ width:50px; height:50px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:17px; color:#030D1A; flex-shrink:0; }
        .sc-name  { font-size:15px; font-weight:600; line-height:1.2; }
        .sc-role  { font-size:13px; color:var(--muted); margin-bottom:5px; }
        .sc-co    { font-size:15px; font-weight:700; margin-bottom:16px; }
        .sc-footer{ display:flex; align-items:center; justify-content:space-between; padding-top:14px; border-top:1px solid rgba(255,255,255,.04); }
        .sc-pkg   { font-size:19px; font-weight:700; color:var(--blue); }
        .sc-badge { background:rgba(52,211,153,.12); color:var(--green); border:1px solid rgba(52,211,153,.22); padding:4px 10px; border-radius:100px; font-size:11px; font-weight:600; }
        .sc-quote { position:absolute; top:14px; right:16px; font-size:34px; color:rgba(56,189,248,.08); font-family:Georgia,serif; line-height:1; }

        /* ════════════════════════════════════════════
           FEATURED PLACEMENTS
        ════════════════════════════════════════════ */
        .featured-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(56,189,248,.1); border: 1px solid rgba(56,189,248,.3);
          color: var(--blue); padding: 6px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; margin-bottom: 20px; margin-top: 48px;
        }
        .featured-star { color: #FBBF24; font-size: 12px; }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 0;
          margin-bottom: 18px;
        }
        .featured-grid-row2 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 32px;
        }

        .fc {
          background: linear-gradient(135deg, #0C2540 0%, #0A1E36 100%);
          border: 1px solid rgba(56,189,248,.35);
          border-radius: 20px;
          padding: 22px;
          overflow: hidden;
          position: relative;
          transition: all .3s;
          box-shadow: 0 4px 20px rgba(56,189,248,.08);
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .fc::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(56,189,248,.07) 0%, transparent 60%);
          pointer-events: none;
        }
        .fc:hover {
          border-color: rgba(56,189,248,.6);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(56,189,248,.16);
        }

        /* top section: image left, info right */
        .fc-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .fc-photo-wrap {
          width: 72px;
          height: 72px;
          border-radius: 13px;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(56,189,248,.3);
        }
        .fc-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .fc-badge {
          position: absolute; top: 14px; right: 16px;
          background: rgba(251,191,36,.12);
          border: 1px solid rgba(251,191,36,.35);
          color: #FBBF24;
          padding: 3px 8px; border-radius: 100px;
          font-size: 9px; font-weight: 700; letter-spacing: .5px;
          text-transform: uppercase; line-height: 1.4;
        }

        .fc-name  { font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.2; }
        .fc-course {
          font-size: 12px; color: var(--muted); font-weight: 400;
          margin-top: 3px;
        }

        .fc-role  { font-size: 13px; color: var(--muted); margin-bottom: 5px; }
        .fc-co    { font-size: 15px; font-weight: 700; margin-bottom: 16px; color: var(--text); }

        .fc-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(56,189,248,.1);
        }
        .fc-salary { font-size: 19px; font-weight: 700; color: var(--blue); line-height: 1; }
        .fc-salary-label { font-size: 10px; color: var(--muted); margin-top: 2px; }

        .fc-logo-wrap {
          height: 28px;
          max-width: 70px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.9);
          border-radius: 7px;
          padding: 3px 8px;
          overflow: hidden;
        }
        .fc-logo-wrap img {
          max-height: 22px;
          max-width: 60px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .fc-placed-badge {
          background: rgba(52,211,153,.12);
          color: var(--green);
          border: 1px solid rgba(52,211,153,.22);
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
        }

        /* divider between featured and regular */
        .alumni-divider {
          display: flex; align-items: center; gap: 16px;
          margin: 8px 0 32px;
        }
        .alumni-divider-line { flex: 1; height: 1px; background: var(--border); }
        .alumni-divider-text {
          font-size: 11px; font-weight: 600; letter-spacing: 1.2px;
          text-transform: uppercase; color: var(--muted);
          white-space: nowrap;
        }

        @media (max-width: 1024px) {
          .featured-grid { grid-template-columns: repeat(2, 1fr); }
          .featured-grid-row2 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .featured-grid { grid-template-columns: 1fr; }
          .featured-grid-row2 { grid-template-columns: 1fr; }
          .fc-photo-wrap { width: 60px; height: 60px; }
        }
        /* ════════════════════════════════════════════
           COUNTER STRIP
        ════════════════════════════════════════════ */
        .counter-strip {
          padding: 70px 60px;
          background: linear-gradient(135deg, #061828 0%, #030D1A 100%);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .counter-strip::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2338BDF8' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
        }
        .counter-grid {
          max-width: 1360px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
          position: relative; z-index: 1;
        }
        .ctr-item { text-align:center; padding:16px; border-right:1px solid var(--border); }
        .ctr-item:last-child { border-right:none; }
        .ctr-num  { font-size: clamp(44px,5.5vw,72px); font-weight:700; color:var(--blue); line-height:1; margin-bottom:8px; }
        .ctr-label{ font-size:14px; color:var(--muted); }

        /* ════════════════════════════════════════════
           PLACEMENT PROCESS
        ════════════════════════════════════════════ */
        .process-bg {
          background: var(--bg);
          position: relative; overflow: hidden;
        }
        .process-bg::before {
          content: '';
          position: absolute; top:-200px; right:-200px;
          width:600px; height:600px; border-radius:50%;
          background: radial-gradient(circle, rgba(56,189,248,.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .process-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 2px; margin-top: ;
          background: var(--border);
          border-radius: 22px; overflow: hidden;
        }

        .pc {
          background: var(--bg2); padding: 34px 30px;
          position: relative; transition: background .3s;
        }
        .pc:hover { background: var(--surf); }
        .pc-ghost { position:absolute; top:18px; right:22px; font-size:66px; font-weight:700; color:rgba(56,189,248,.05); line-height:1; letter-spacing:-3px; }
        .pc-num   { display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; background:var(--blue); color:#030D1A; border-radius:8px; font-size:12px; font-weight:700; margin-bottom:14px; }
        .pc-icon  { width:50px; height:50px; background:rgba(56,189,248,.1); border:1px solid rgba(56,189,248,.2); border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:18px; }
        .pc-title { font-size:17px; font-weight:700; color:var(--text); margin-bottom:10px; }
        .pc-desc  { font-size:14px; color:var(--muted); line-height:1.75; font-weight:300; }

        /* ════════════════════════════════════════════
           PARTNERS HEX
        ════════════════════════════════════════════ */
        .partners-bg {
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .partners-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 24px; margin-bottom: 48px;
        }

        .hex-grid {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 14px;
        }
        .hex-item {
          width: 108px; height: 108px;
          clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
          background: var(--surf);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
          cursor: pointer; transition: all .3s;
        }
        .hex-item:hover { background: var(--surf2); transform: scale(1.08); }
        .hex-abbr { font-size:19px; font-weight:800; }
        .hex-name { font-size:9px; font-weight:500; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; }

        .partner-ribbon {
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: 40px;
          margin-top: ; padding: 30px;
          background: rgba(56,189,248,.05);
          border: 1px solid rgba(56,189,248,.14);
          border-radius: 18px;
        }
        .pr-item { text-align:center; }
        .pr-val  { font-size:34px; font-weight:700; color:var(--blue); line-height:1; }
        .pr-label{ font-size:13px; color:var(--muted); margin-top:4px; }

        /* ════════════════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════════════════ */
        .testi-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 20px; margin-top: 48px;
        }
        .testi-card {
          background: var(--surf); border: 1px solid var(--border);
          border-radius: 20px; padding: 30px;
          position: relative; transition: all .3s;
        }
        .testi-card:hover { border-color: rgba(56,189,248,.35); transform: translateY(-4px); }
        .testi-q    { position:absolute; top:22px; right:22px; font-size:46px; color:rgba(56,189,248,.08); font-family:Georgia,serif; line-height:1; }
        .testi-stars{ color:var(--blue); font-size:14px; margin-bottom:18px; letter-spacing:2px; }
        .testi-text { font-size:14px; line-height:1.8; color:var(--muted); margin-bottom:26px; font-weight:300; font-style:italic; }
        .testi-author{ display:flex; align-items:center; gap:12px; }
        .testi-av   { width:42px; height:42px; border-radius:11px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:14px; color:#030D1A; flex-shrink:0; }
        .testi-name { font-size:14px; font-weight:700; }
        .testi-role { font-size:12px; color:var(--muted); }

        /* ════════════════════════════════════════════
           FAQ
        ════════════════════════════════════════════ */
        .faq-bg {
          background: var(--bg2);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .faq-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 70px; align-items: start;
        }
        .faq-list { display:flex; flex-direction:column; gap:10px; }
        .faq-item {
          background: var(--surf); border: 1px solid var(--border);
          border-radius: 13px; overflow: hidden; transition: border-color .2s;
        }
        .faq-item.open { border-color: rgba(56,189,248,.4); }
        .faq-q {
          padding: 18px 22px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          cursor: pointer; font-size: 14px; font-weight: 600; color: var(--text);
          transition: color .2s;
        }
        .faq-item.open .faq-q { color: var(--blue); }
        .faq-chev {
          width:28px; height:28px; border-radius:8px;
          background: rgba(56,189,248,.08); border: 1px solid rgba(56,189,248,.15);
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; font-size:14px; color:var(--blue);
          transition: transform .3s;
        }
        .faq-item.open .faq-chev { transform:rotate(180deg); background:rgba(56,189,248,.15); }
        .faq-a {
          padding: 0 22px; max-height:0; overflow:hidden;
          transition: max-height .4s ease, padding .3s;
          font-size:14px; color:var(--muted); line-height:1.75; font-weight:300;
        }
        .faq-item.open .faq-a { max-height:200px; padding:0 22px 18px; }

        /* cta sidebar */
        .faq-cta {
          background: linear-gradient(135deg,rgba(56,189,248,.12),rgba(56,189,248,.04));
          border: 1px solid rgba(56,189,248,.24);
          border-radius: 22px; padding: 38px 32px; text-align:center;
          position: sticky; top:100px;
        }
        .faq-cta-icon { font-size:48px; margin-bottom:14px; }
        .faq-cta-title{ font-size:24px; font-weight:700; margin-bottom:10px; letter-spacing:-.5px; }
        .faq-cta-sub  { font-size:14px; color:var(--muted); line-height:1.75; margin-bottom:24px; }
        .faq-cta-list { list-style:none; text-align:left; margin-bottom:24px; display:flex; flex-direction:column; gap:10px; }
        .faq-cta-list li{ display:flex; align-items:center; gap:10px; font-size:14px; color:var(--muted); }
        .faq-cta-list li::before{ content:'✓'; color:var(--blue); font-weight:700; }

        /* ════════════════════════════════════════════
           FINAL CTA BANNER
        ════════════════════════════════════════════ */
        .cta-banner {
          padding: 100px 60px;
          background: linear-gradient(135deg, #061828 0%, #030D1A 100%);
          border-top: 1px solid var(--border);
          text-align: center; position: relative; overflow: hidden;
        }
        .cta-banner::before {
          content: '';
          position: absolute; top:50%; left:50%;
          transform:translate(-50%,-50%);
          width:800px; height:400px;
          background: radial-gradient(ellipse, rgba(56,189,248,.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-title {
          font-size: clamp(38px,5vw,64px);
          font-weight: 700; letter-spacing: -2px; margin-bottom:18px;
          position: relative; z-index:1;
        }
        .cta-sub {
          font-size:17px; color:var(--muted); max-width:480px;
          margin:0 auto 38px; line-height:1.75; font-weight:300;
          position:relative; z-index:1;
        }
        .cta-actions {
          display:flex; align-items:center; justify-content:center;
          gap:16px; flex-wrap:wrap; position:relative; z-index:1;
        }

        /* ════════════════════════════════════════════
           RESPONSIVE — TABLET (≤ 1024px)
        ════════════════════════════════════════════ */
        @media (max-width: 1024px) {

          /* hero — stack vertically, visual stays visible below text */
          .hero-inner {
            grid-template-columns: 1fr;
            padding: 100px 40px 70px;
            gap: 60px;
            justify-items: center;
          }
          .hero-visual {
            display: flex;
            width: 100%;
            justify-content: center;
          }
          /* shrink the orbit ring on tablet */
          .orbit-ring { width: 320px; height: 320px; }
          .grad-circle { width: 260px; height: 260px; }
          .grad-circle svg { width: 200px !important; }
          /* nudge floating badges so they don't overflow */
          .vbadge-1 { top: 10px;  right: 0px; }
          .vbadge-2 { bottom: 30px; left: -10px; }
          .vbadge-3 { top: 42%;  right: -10px; }

          /* sections */
          .section { padding: 70px 40px; }
          .counter-strip { padding: 60px 40px; }
          .cta-banner { padding: 70px 40px; }

          /* students */
          .students-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }

          /* process */
          .process-grid { grid-template-columns: repeat(2,1fr); }

          /* partners */
          .partners-header { flex-direction: column; align-items: flex-start; }
          .hex-item { width: 95px; height: 95px; }

          /* testi */
          .testi-grid { grid-template-columns: repeat(2,1fr); }

          /* faq */
          .faq-layout { grid-template-columns: 1fr; gap: 40px; }
          .faq-cta { position: static; }

          /* counter */
          .counter-grid { grid-template-columns: repeat(2,1fr); }
          .ctr-item { border-right: none; border-bottom: 1px solid var(--border); padding: 24px 16px; }
          .ctr-item:nth-child(odd)  { border-right: 1px solid var(--border); }
          .ctr-item:last-child { border-bottom: none; }
        }

        /* ════════════════════════════════════════════
           RESPONSIVE — MOBILE (≤ 640px)
        ════════════════════════════════════════════ */
        @media (max-width: 640px) {

          /* hero */
          .hero-inner { padding: 90px 20px 60px; gap: 48px; }
          .hero-title  { letter-spacing: -1.5px; }
          .hero-actions { flex-direction: column; }
          .btn-blue, .btn-outline { width: 100%; justify-content: center; }
          .hero-stats { gap: 12px 0; }
          .hs-item { min-width: 48%; flex: none; border-right: none; margin-right: 0; padding: 12px 0; }

          /* shrink the visual more on mobile */
          .orbit-ring  { width: 260px; height: 260px; }
          .grad-circle { width: 210px; height: 210px; }
          .grad-circle svg { width: 160px !important; }
          .vbadge { padding: 9px 12px; }
          .vbadge-1 { top: 0px;   right: -4px; }
          .vbadge-2 { bottom: 20px; left: -4px; }
          .vbadge-3 { display: none; }
          .vb-title, .vb-sub { font-size: 11px; }
          .vb-val   { font-size: 17px; }

          /* sections */
          .section { padding:  20px; }
          .counter-strip { padding: 48px 20px; }
          .cta-banner    { padding: 60px 20px; }

          /* students */
          .students-grid { grid-template-columns: 1fr; }

          /* process */
          .process-grid { grid-template-columns: 1fr; }

          /* partners */
          .hex-grid { gap: 10px; }
          .hex-item { width: 80px; height: 80px; }
          .hex-abbr { font-size: 16px; }
          .partner-ribbon { gap: 24px; padding: 22px 16px; }
          .pr-val  { font-size: 26px; }

          /* testi */
          .testi-grid { grid-template-columns: 1fr; }

          /* counter */
          .counter-grid { grid-template-columns: 1fr 1fr; }
          .ctr-num { font-size: 36px; }

          /* faq */
          .faq-layout { gap: 32px; }

          /* cta */
          .cta-actions { flex-direction: column; }

          /* section header stacks */
          .partners-header { align-items: flex-start; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero bg-black">

        <div className="w-[95%] max-w-[1800px] mx-auto flex flex-col lg:flex-row justify-start gap-8 lg:gap-6 items-center py-10 lg:py-12">

          {/* ── LEFT ── */}
          <div className="w-full lg:w-3/5 lg:shrink-0">
            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Placement Records
            </div>

            <h1 className="hero-title">
              Your Dream Job<br />
              <span className="accent">Starts Here.</span><br />
              <span className="outline">We Guarantee It.</span>
            </h1>

            <p className="hero-sub">
              Join 10,000+ learners who've transformed careers with Learnova's
              industry-first placement program — backed by 100+ hiring partners,
              real projects, and one-on-one mentorship.
            </p>

            <div className="hero-actions">
              <button
                className="btn-blue"
                onClick={() => alumniRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                View Placed Students ↗
              </button>
            </div>

            <div className="hero-stats" ref={statsRef}>
              {heroStats.map((s, i) => (
                <div key={i} className="hs-item">
                  <div className="hs-val">{i === 0 ? `${count1 || 94}%` : s.value}</div>
                  <div className="hs-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — graduate visual ── */}
          <div className="w-full lg:flex-1 lg:min-w-0 flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/bropujss/image/upload/v1783678174/PlacementHeroSectionImage_xhhviz_c9lypk.webp"
              alt="placement roadmap image"
              className="w-full max-w-[380px] md:max-w-[460px] lg:max-w-full h-auto lg:max-h-[500px] min-[1440px]:max-h-[680px] object-contain"
            />
          </div>

        </div>
      </section>

      {/* ══════════════ MARQUEE 1 ══════════════ */}
      <div className="mq-wrap">
        <div className="mq-track">
          {[...Array(2)].flatMap((_, x) =>
            ["Manpower Group", "Godrej", "Wipro", "DigitalBuzz", "Cognizant", "MannlOwe", "Stannik", "ACSE Solutions", "TCS", "Infosys", "Market Legos", "Narvik Marine", "Macleods", "CTI Global", "Primus", "Delloitte", "Tech Mahindra", "Allscripts", "Invenio LSI", "Welt Infotech", "NeoSoft", "Accenture", "Clariant", "iBridge", "Syntel", "Birlasoft", "iLab'z", "indoVision", "Paysquare"].map((c, i) => (
              <div key={`${x}-${i}`} className="mq-item">
                <span className="mq-dot" />{c}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ══════════════ PLACED STUDENTS ══════════════ */}
      <div className="placed-bg" ref={alumniRef}>
        <div className="section">
          <div className="section-label">Our Alumni</div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 0 }}>
            <div>
              <h2 className="section-title">Real Students.<br /><span className="accent">Real Offers.</span></h2>
              <p className="section-sub">Every batch, every course — our placement numbers speak for themselves.</p>
            </div>
          </div>

          {/* ── FEATURED PLACEMENTS ── */}
          <div className="featured-label">
            <span className="featured-star">★</span> Featured Placements
          </div>

          {/* Row 1 — first 4 */}
          <div className="featured-grid">
            {featuredPlacements.slice(0, 4).map((f, i) => (
              <div key={i} className="fc">
                <div className="fc-badge">⭐ Top Pick</div>
                <div className="fc-top">
                  <div className="fc-photo-wrap">
                    <img src={f.photo} alt={f.name || "name"} />
                  </div>
                  <div>
                    <div className="fc-name">{f.name}</div>
                    <div className="fc-course">{f.course}</div>
                  </div>
                </div>
                <div className="fc-footer">
                  <div>
                    <div className="fc-salary">₹{f.salary}</div>
                    <div className="fc-salary-label">Package Offered</div>
                  </div>
                  <div className="fc-logo-wrap">
                    <img src={f.logo} alt="company logo" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — last 2, centered */}
          <div className="featured-grid-row2">
            {featuredPlacements.slice(4, 6).map((f, i) => (
              <div key={i} className="fc">
                <div className="fc-badge">⭐ Top Pick</div>
                <div className="fc-top">
                  <div className="fc-photo-wrap">
                    <img src={f.photo} alt={f.name || "client img"} />
                  </div>
                  <div>
                    <div className="fc-name">{f.name}</div>
                    <div className="fc-course">{f.course}</div>
                  </div>
                </div>
                <div className="fc-footer">
                  <div>
                    <div className="fc-salary">₹{f.salary}</div>
                    <div className="fc-salary-label">Package Offered</div>
                  </div>
                  <div className="fc-logo-wrap">
                    <img src={f.logo} alt="company logo" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── DIVIDER ── */}
          <div className="alumni-divider">
            <div className="alumni-divider-line" />
            <div className="alumni-divider-text">All Placed Students</div>
            <div className="alumni-divider-line" />
          </div>

          <div className="students-grid">
            {(showAll ? placedStudents : placedStudents.slice(0, 28)).map((s, i) => (
              <div key={i} className="sc">
                <div className="sc-quote">"</div>
                <div className="sc-top">
                  <div className="sc-avatar" style={{ background: ["#38BDF8", "#818CF8", "#34D399", "#60A5FA", "#F472B6", "#2DD4BF", "#7DD3FC", "#A78BFA"][i % 8] }}>
                    {s.name.trim()[0]}
                  </div>
                  <div className="sc-name">{s.name}</div>
                </div>
                <div className="sc-role">{s.position}</div>
                <div className="sc-co">{s.company}</div>
                <div className="sc-footer">
                  <div className="sc-pkg">{s.package}</div>
                  <div className="sc-badge">Placed ✓</div>
                </div>
              </div>
            ))}
          </div>

          {!showAll && placedStudents.length > 28 && (
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button className="btn-outline" onClick={() => setShowAll(true)}>
                View All Students →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════ COUNTER STRIP */}

      {/* ══════════════ COUNTER STRIP ══════════════ */}
      <div className="counter-strip">
        <div className="counter-grid">
          {[
            { num: "5000+", label: "Students Placed" },
            { num: "100+", label: "Hiring Partners" },
            { num: "₹6 LPA", label: "Average Package" },
            { num: "98%", label: "Placement Rate" },
          ].map((c, i) => (
            <div key={i} className="ctr-item">
              <div className="ctr-num">{c.num}</div>
              <div className="ctr-label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ PLACEMENT PROCESS ══════════════ */}
      <div className="process-bg">
        <div className="section">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            Our <span className="accent">6-Step</span> Placement<br />
            <span className="outline">Framework</span>
          </h2>
          <p className="section-sub">A battle-tested system refined over 10+ years and 5,000+ successful placements.</p>
          <div className="process-grid">
            {placementSteps.map((step, i) => (
              <div key={i} className="pc">
                <div className="pc-ghost">{step.step}</div>
                <div className="pc-num">{step.step}</div>
                <div className="pc-icon">{step.icon}</div>
                <div className="pc-title">{step.title}</div>
                <p className="pc-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ PARTNERS HEX ══════════════ */}
      <div className="partners-bg">
        <div className="section">
          <div className="partners-header">
            <div>
              <div className="section-label">Hiring Partners</div>
              <h2 className="section-title">100+ Companies<br /><span className="accent">Actively Hiring</span></h2>
            </div>
            <p className="section-sub">From Fortune 50+ giants to breakout startups — your profile reaches them all.</p>
          </div>

          <div className="hex-grid">
            {partners.map((p, i) => (
              <div key={i} className="hex-item">
                <div className="hex-abbr" style={{ color: p.color }}>{p.abbr}</div>
                <div className="hex-name">{p.name}</div>
              </div>
            ))}
          </div>

          <div className="partner-ribbon mt-5">
            {[
              { val: "100+", label: "Hiring Partners" },
              { val: "50+", label: "FAANG & MNCs" },
              { val: "50+", label: "Funded Startups" },

            ].map((r, i) => (
              <div key={i} className="pr-item">
                <div className="pr-val">{r.val}</div>
                <div className="pr-label">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ MARQUEE 2 (reverse) ══════════════ */}
      <div className="mq-wrap">
        <div className="mq-track rev">
          {[...Array(2)].flatMap((_, x) =>
            ["SAP FICO", "SAP Ariba", "SAP MM", "SAP SD", "SAP HR/HCM", "SAP PP", "SAP QM", "SAP PM", "SAP PS", "SAP EWM", "SAP SCM", "SAP SuccessFactors", "SAP ABAP", "SAP S/4 Hana", "SAP BW/BI", "SAP Basis", "Data Analytics", "Data Science", "Business Analytics", "Generative AI", "Full Stack Developer", "Java", "Python Developer", "Salesforce ", "Tableau", "Power BI", "SEO", "Social Media Marketing", "Google Analytics", "Pay Per CLick", "HR Training", "CORE HR", "HR Payroll", "HR Management", "HR Generalist", "HR Analytics"].map((r, i) => (
              <div key={`${x}-${i}`} className="mq-item">
                <span className="mq-dot red" />{r}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <div style={{ background: "var(--bg)" }}>
        <div className="section">
          <div className="section-label">Success Stories</div>
          <h2 className="section-title">Straight From<br /><span className="accent">Their Mouths</span></h2>
          <p className="section-sub">Unfiltered words from students who made the leap.</p>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-q">"</div>
                <div className="testi-stars">{"★".repeat(t.rating)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-av" style={{ background: t.color, color: "#030D1A" }}>{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ FAQ ══════════════ */}
      <div className="faq-bg">
        <div className="section">
          <div className="faq-layout">
            <div>
              <div className="section-label">FAQ</div>
              <h2 className="section-title" style={{ marginBottom: 32 }}>
                Got Questions?<br /><span className="accent">We've Got Answers.</span>
              </h2>
              <div className="faq-list">
                {faqs.map((f, i) => (
                  <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                    <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                      <span>{f.q}</span>
                      <div className="faq-chev">▾</div>
                    </div>
                    <div className="faq-a">{f.a}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="faq-cta">
                <div className="faq-cta-icon">🚀</div>
                <div className="faq-cta-title">Ready to get placed?</div>
                <p className="faq-cta-sub">Join 10,000+ learners on the path to their dream career. No experience required — just the drive to grow.</p>
                <ul className="faq-cta-list">
                  <li>100% Placement Assistance</li>
                  <li>Direct referrals to 100+ companies</li>
                  <li>Session Recordings</li>
                  <li>Live mentor support 7 days/week</li>
                </ul>
                <button className="btn-blue" style={{ width: "100%", justifyContent: "center" }} onClick={() => setShowPopupForm(true)}>
                  Start Your Journey →
                </button>
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 14 }}>Boost your Career </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <div className="cta-banner">
        <h2 className="cta-title">
          Your <span style={{ color: "var(--blue)" }}>Offer Letter</span><br />
          Is One Step Away.
        </h2>
        <p className="cta-sub">
          Stop waiting for opportunities. Start building the skills that make companies come to you.
        </p>
        <div className="cta-actions">
          <button className="btn-blue" style={{ fontSize: 16, padding: "18px 44px" }} onClick={() => setShowPopupForm(true)}>Enroll Now — for better career</button>
          <button className="btn-outline" style={{ fontSize: 16, padding: "18px 44px" }} onClick={() => setShowBtnForm(true)}>Talk to a Career Advisor</button>
        </div>
      </div>
    </>
  );
}
