// components/Common/hrMenuData.js
import {
  BadgeCheck,
  BarChart3,
  Building2,
  FileText,
  UserRound,
  UsersRound,
} from "lucide-react";

export const hrMenuSections = [
  {
    title: "HR Programs",
    description: "Human Resource Skills & Career Tracks",
    Icon: UsersRound,
    items: [
      { name: "HR Training", link: "/hr-training-course-in-pune", Icon: UserRound, color: "blue" },
      { name: "Core HR", link: "/core-hr-course-in-pune", Icon: Building2, color: "teal" },
      { name: "HR Payroll", link: "/hr-payroll-course-in-pune", Icon: FileText, color: "orange" },
      { name: "HR Management", link: "/hr-management-course-in-pune", Icon: UsersRound, color: "violet" },
      { name: "HR Generalist", link: "/hr-generalist-course-in-pune", Icon: BadgeCheck, color: "yellow" },
      { name: "HR Analytics", link: "/hr-analytics-course-in-pune", Icon: BarChart3, color: "indigo" },
    ],
  },
];
