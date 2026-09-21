import {
  Code2,
  Lightbulb,
  Users,
  Rocket,
  BarChart3,
  Award,
  BookOpen,
  Settings,
  GitBranch,
  Database,
  Link,
  Wallet,
  Building2,
  Landmark,
  PieChart,
  Factory,
  ShoppingCart,
  Package,
  Calculator,
  Network,
  Building,
  User,
  Clock,
  Banknote,
  ShieldCheck,
  ClipboardList,
  Search,
  AlertTriangle,
  FolderKanban,
  Calendar,
  Truck,
  Warehouse,
  TrendingUp,
  Shield,
  AlertCircle,
  HeartPulse,
  Leaf,
  Cloud,
  Boxes,
  CalendarCheck,
  FileText,
  ShoppingBag,
  Tag,
  Gauge,
  Wrench,
  Cpu,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Blocks,
  Lock,
  CheckSquare,
  UserCheck,
  UserPlus,
  Target,
  Layout,
  Monitor,
  Play,
  Zap,
  Layers,
  Box,
  Download,
  GitMerge,
  Server,
  Activity,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

// Map string names from JSON → actual Lucide components
const iconMap = {
  Code2,
  Lightbulb,
  Users,
  Rocket,
  BarChart3,
  Award,
  BookOpen,
  Settings,
  GitBranch,
  Database,
  Link,
  Wallet,
  Building2,
  Landmark,
  PieChart,
  Factory,
  ShoppingCart,
  Package,
  Calculator,
  Network,
  Building,
  User,
  Clock,
  Banknote,
  ShieldCheck,
  ClipboardList,
  Search,
  AlertTriangle,
  FolderKanban,
  Calendar,
  Truck,
  Warehouse,
  TrendingUp,
  Shield,
  AlertCircle,
  HeartPulse,
  Leaf,
  Cloud,
  Boxes,
  CalendarCheck,
  FileText,
  ShoppingBag,
  Tag,
  Gauge,
  Wrench,
  Cpu,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Blocks,
  Lock,
  CheckSquare,
  UserCheck,
  UserPlus,
  Target,
  Layout,
  Monitor,
  Play,
  Zap,
  Layers,
  Box,
  Download,
  GitMerge,
  Server,
  Activity,
};

export default function WhatYouWillLearn({ data }) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <section className="relative bg-white py-10 max-w-[1800px] mx-auto">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="What You'll Learn"
          description="No filler modules. Every lesson here is built to land one of these six outcomes."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map(({ icon, title, description }, i) => {
            const Icon = iconMap[icon] || Award; // fallback

            return (
              <div
                key={i}
                className="outcome-card group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes outcomeFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .outcome-card {
          animation: outcomeFadeIn 0.5s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .outcome-card { animation: none; }
        }
      `}</style>
    </section>
  );
}