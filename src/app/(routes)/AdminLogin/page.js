"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import LoadingArrow from "@/components/LoadingArrow";

// Standalone helper for Blogs login
async function loginToBlogs({ username, password, API_BASE_URL }) {
  // 1) Build endpoint and request body
  const apiUrl = `${API_BASE_URL}/api/auth/login`;
  const requestBody = {
    loginIdentifier: username, // username or email supported by blogs API
    password,
  };

  // 2) POST to blogs backend
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // 3) Unified error extraction
  async function extractErrorMessage(res) {
    try {
      const raw = await res.text();
      if (!raw) return `HTTP ${res.status}: Login failed`;
      try {
        const json = JSON.parse(raw);
        return json?.message || `HTTP ${res.status}: Login failed`;
      } catch {
        return raw.length > 100 ? `HTTP ${res.status}: Login failed` : raw;
      }
    } catch {
      return `HTTP ${res.status}: Login failed`;
    }
  }
  if (!response.ok) {
    const errorMessage = await extractErrorMessage(response);
    throw new Error(errorMessage);
  }

  // 4) Parse success JSON and validate shape
  const data = await response.json();
  if (!data?.token) {
    throw new Error("Invalid response structure from server - missing token");
  }
  const userData = {
    token: data.token,
    role: String(data.role || "user").toLowerCase(),
    username: data.username,
    email: data.email || "",
    id: data.id,
    isActive: data.active !== false,
    lastLogin: data.lastLogin || new Date().toISOString(),
    source: "blogs",
  };
  const validRoles = ["admin", "user", "superadmin"];
  if (!validRoles.includes(userData.role)) {
    throw new Error(`Invalid role: ${userData.role} for this login type`);
  }

  // 5) Persist session (namespaced + generic keys)
  try {
    // Namespaced for blogs
    localStorage.setItem("blogsToken", userData.token);
    localStorage.setItem("blogsRole", userData.role);
    localStorage.setItem("blogsUser", JSON.stringify(userData));
    // Generic/admin compatibility keys
    localStorage.setItem("adminToken", userData.token);
    localStorage.setItem("adminRole", userData.role);
    localStorage.setItem("adminUsername", userData.username || "");
    localStorage.setItem("adminEmail", userData.email || "");
    localStorage.setItem("adminId", userData.id || "");
    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch {
    // Storage can fail in private mode; continue to redirect
  }

  // 6) Hard redirect to ensure full re-init of blog admin context
  window.location.href = "/blog-admin";
}

// Helper function to check auth and redirect (extracted for reuse)
const checkAuthAndRedirect = (router) => {
  if (typeof localStorage === "undefined") return;

  const token = localStorage.getItem("adminToken");
  if (!token) return;

  const role = localStorage.getItem("adminRole");
  const userDataStr = localStorage.getItem("userData");
  let source = "";
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      source = userData.source || "";
    } catch (e) {
      console.error("Invalid userData in localStorage", e);
    }
  }

  // Handle blogs-specific redirect first
  if (source === "blogs" || localStorage.getItem("blogsToken")) {
    router.push("/blog-admin");
    return;
  }

  // Standard dashboard redirect (case-insensitive role check)
  const normalizedRole = role?.toLowerCase();
  if (normalizedRole === "superadmin" || normalizedRole === "admin") {
    router.push("/superadmin/dashboard");
  } else {
    router.push("/dashboard");
  }
};

// ---- decorative-only helpers for the new UI (waves / particles / entrance) ----
const PARTICLE_SHAPES = ["dot", "dot", "dot", "ring", "ring", "plus"];
const PARTICLE_COUNT = 22;

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
    const kind = PARTICLE_SHAPES[Math.floor(Math.random() * PARTICLE_SHAPES.length)];
    return {
      id: i,
      kind,
      left: Math.random() * 100,
      duration: 9 + Math.random() * 10,
      delay: -Math.random() * 15,
      drift: `${Math.random() * 40 - 20}px`,
    };
  });
}

// Tailwind classes per particle shape (colors/sizes only — motion comes from .particle in <style> below)
const particleShapeClasses = {
  dot: "w-[5px] h-[5px] rounded-full bg-[#9fc3cd]",
  ring: "w-[11px] h-[11px] rounded-full border-[1.6px] border-[#9fc3cd] bg-transparent",
  plus: "text-[14px] leading-none text-[#9fc3cd]",
};

const ENTRANCE_SEQUENCE = [
  "logo",
  "toggle",
  "heading",
  "subtitle",
  "login",
  "password",
  "button",
];

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // "admin" -> Login to Dashboard, "blog" -> Login to Blogs
  const [mode, setMode] = useState("admin");

  // decorative-only state (particles + entrance animation)
  const [particles, setParticles] = useState([]);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    setParticles(createParticles());
    const t = setTimeout(() => setPlayed(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Initial check on mount
  useEffect(() => {
    checkAuthAndRedirect(router);
  }, [router]);

  // Listen for localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthAndRedirect(router);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  const handleSubmit = async (e, targetPage) => {
    e.preventDefault();
    setDashboardLoading(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiBaseUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        setError("API URL is not configured.");
        setDashboardLoading(false);
        return;
      }

      const res = await fetch(`${apiBaseUrl}/api/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminRole", data.role);
          localStorage.setItem("adminUsername", data.username);
          localStorage.setItem("adminId", data.id);
          localStorage.setItem("isAdminLoggedIn", "true");
        }

        if (data.role === "SuperAdmin" || data.role === "Admin") {
          router.push("/superadmin/dashboard");
        } else if (targetPage.startsWith("http")) {
          window.location.href = targetPage;
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(data.message || "Admin login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again.");
    }

    setDashboardLoading(false);
  };

  // Dedicated Blogs login handler
  async function handleSubmitToBlogs(e) {
    e.preventDefault(); // prevent form submit
    setBlogsLoading(true);
    setError(null);

    try {
      await loginToBlogs({
        username,
        password,
        API_BASE_URL:
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002",
      });
      // No code runs after a hard redirect
    } catch (err) {
      setError(err?.message || "An error occurred during login");
      setBlogsLoading(false);
    }
  }

  // Single form submit — routes to the right handler based on the
  // Admin / Blog toggle, without changing either handler's own logic.
  const handleFormSubmit = (e) => {
    if (mode === "admin") {
      handleSubmit(e, "/");
    } else {
      handleSubmitToBlogs(e);
    }
  };

  const loading = mode === "admin" ? dashboardLoading : blogsLoading;
  const subtitle =
    mode === "admin"
      ? "Sign in and start managing your candidates!"
      : "Sign in and start managing your blog posts!";
  const buttonLabel = mode === "admin" ? "Login to Dashboard" : "Login to Blogs";

  const fxClass = () => `fx ${played ? "in" : ""}`;
  const fxStyle = (name) => {
    const idx = ENTRANCE_SEQUENCE.indexOf(name);
    return { animationDelay: `${120 + idx * 90}ms` };
  };

  return (
    <div className="relative w-full h-screen min-h-[700px] bg-[#033346] overflow-hidden font-sans">
      {/* Scoped CSS: only what Tailwind's core utilities genuinely can't express
          (keyframe animations + the autofill pseudo-class override). */}
      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-620px) translateX(var(--drift, 10px)); opacity: 0; }
        }
        .fx { opacity: 0; transform: translateY(14px); }
        .fx.in { animation: fadeUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards; }
        .rise-particle {
          animation-name: rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .autofill-fix:-webkit-autofill,
        .autofill-fix:-webkit-autofill:hover,
        .autofill-fix:-webkit-autofill:focus,
        .autofill-fix:-webkit-autofill:active {
          -webkit-text-fill-color: #eaf1f3;
          caret-color: #eaf1f3;
          -webkit-box-shadow: 0 0 0 1000px #123f51 inset;
          box-shadow: 0 0 0 1000px #123f51 inset;
          transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s;
        }
      `}</style>



      {/* ---------- center card ---------- */}
      <div className="relative z-[5] w-[284px] mx-auto pt-24 text-center">
        <div
          className={`${fxClass()} inline-flex items-center bg-white/[0.06] border border-white/[0.12] rounded-[20px] p-1 mb-[22px] gap-0.5`}
          style={fxStyle("toggle")}
        >
          <button
            type="button"
            className={`border-none cursor-pointer px-5 py-[7px] text-[12.5px] font-bold tracking-[0.4px] rounded-2xl transition-colors duration-200 ${mode === "admin"
              ? "bg-gradient-to-r from-[#00c97a] to-[#00e08c] text-[#04241b]"
              : "bg-transparent text-[#9fb6bf]"
              }`}
            onClick={() => setMode("admin")}
            disabled={dashboardLoading || blogsLoading}
          >
            ADMIN
          </button>
          <button
            type="button"
            className={`border-none cursor-pointer px-5 py-[7px] text-[12.5px] font-bold tracking-[0.4px] rounded-2xl transition-colors duration-200 ${mode === "blog"
              ? "bg-gradient-to-r from-[#00c97a] to-[#00e08c] text-[#04241b]"
              : "bg-transparent text-[#9fb6bf]"
              }`}
            onClick={() => setMode("blog")}
            disabled={dashboardLoading || blogsLoading}
          >
            BLOG
          </button>
        </div>

        <h1
          className={`${fxClass()} text-[#eaf1f3] text-[34px] font-medium m-0 mb-3.5 tracking-[0.3px]`}
          style={fxStyle("heading")}
        >
          Admin Log-In
        </h1>
        <p
          className={`${fxClass()} text-[#9fb6bf] text-[15px] m-0 mb-[34px] whitespace-nowrap`}
          style={fxStyle("subtitle")}
        >
          {subtitle}
        </p>

        {error && (
          <div className="bg-[rgba(255,82,82,0.12)] border border-[rgba(255,82,82,0.4)] text-[#ffb3b3] text-[12.5px] px-3.5 py-2.5 rounded-lg mb-4 text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
          <input
            className={`${fxClass()} autofill-fix w-full px-[18px] py-[15px] rounded-lg bg-white/[0.06] border border-white/[0.09] text-[#eaf1f3] text-sm outline-none placeholder:text-[#7f9aa6] focus:border-[#00e08c]/50 focus:bg-white/[0.09] transition-colors duration-200`}
            style={fxStyle("login")}
            type="text"
            name="username"
            id="admin_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email"
            autoComplete="username"
            required
          />

          <div className={`${fxClass()} relative w-full`} style={fxStyle("password")}>
            <input
              className="autofill-fix w-full px-[18px] py-[15px] pr-11 rounded-lg bg-white/[0.06] border border-white/[0.09] text-[#eaf1f3] text-sm outline-none placeholder:text-[#7f9aa6] focus:border-[#00e08c]/50 focus:bg-white/[0.09] transition-colors duration-200"
              type={showPassword ? "text" : "password"}
              name="password"
              id="login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 cursor-pointer text-[#9fb6bf] text-[15px] flex items-center justify-center hover:text-[#eaf1f3] transition-colors duration-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${fxClass()} mt-1.5 w-full py-4 border-none rounded-lg text-[15px] font-bold tracking-[0.2px] text-[#04241b] bg-gradient-to-r from-[#00c97a] to-[#00e08c] cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden transition-[transform,filter] duration-150 ease-out hover:brightness-[1.06] hover:-translate-y-px active:translate-y-0 disabled:cursor-default ${loading ? "brightness-[0.94]" : ""
              }`}
            style={fxStyle("button")}
          >
            <span className="leading-none inline-flex">
              {loading ? "Logging In" : buttonLabel}
            </span>
            {loading ? (
              <LoadingArrow size={18} />
            ) : (
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </button>
        </form>
      </div>

      {/* ---------- floating particles ---------- */}
      <div className="absolute left-0 right-0 bottom-0 h-[46%] overflow-hidden z-[2] pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`rise-particle absolute -bottom-10 opacity-[0.55] ${particleShapeClasses[p.kind]}`}
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": p.drift,
            }}
          >
            {p.kind === "plus" ? "+" : null}
          </span>
        ))}
      </div>

      {/* ---------- waves ---------- */}
      <div className="absolute left-0 right-0 bottom-0 w-full z-[3] leading-none">
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="block w-full h-auto">
          <path
            d="M0,60 C240,120 480,10 720,50 C960,90 1200,30 1440,70 L1440,220 L0,220 Z"
            fill="#26516b"
            opacity="0.55"
          />
          <path
            d="M0,100 C240,150 480,60 720,100 C960,140 1200,70 1440,110 L1440,220 L0,220 Z"
            fill="#7d97a3"
            opacity="0.55"
          />
          <path
            d="M0,140 C240,190 480,110 720,140 C960,170 1200,110 1440,150 L1440,220 L0,220 Z"
            fill="#f9f8fd"
          />
        </svg>
      </div>

      <div className="absolute left-0 right-0 bottom-[22px] text-center z-[4] text-[#b9bcc9] text-xs leading-[1.6]">
        2026 © Connecting Dots ERP. All rights reserved
      </div>
    </div>
  );
};

export default AdminLogin;