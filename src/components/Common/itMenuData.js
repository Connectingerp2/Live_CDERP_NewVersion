// components/Common/itMenuData.js
import {
  BarChart3,
  Braces,
  Building2,
  Cloud,
  Code2,
  Database,
  FileText,
  LineChart,
  Network,
  ServerCog,
} from "lucide-react";

export const itMenuSections = [
  {
    title: "AI & Data Programs",
    description: "Future-ready Skills Powered by AI",
    Icon: BarChart3,
    items: [
      { name: "Data Science with AI", link: "/data-science-with-ai-course-in-pune", Icon: Database, color: "blue" },
      { name: "Generative AI", link: "/generative-ai-course-in-pune", Icon: Network, color: "violet" },
      { name: "Agentic AI", link: "/agentic-ai-course-in-pune", Icon: ServerCog, color: "indigo" },
      { name: "Python with AI", link: "/python-with-ai-course-in-pune", Icon: Braces, color: "teal" },
      { name: "AIML", link: "/ai-ml-course-in-pune", Icon: BarChart3, color: "purple" },
      { name: "Advanced Data Analytics", link: "/advanced-data-analytics-with-generative-ai-course-in-pune", Icon: LineChart, color: "cyan" },
      { name: "Data Visualization with AI", link: "/data-visualization-with-ai-course-in-pune", Icon: FileText, color: "yellow" },
      { name: "Power BI", link: "/power-bi-course-in-pune", Icon: BarChart3, color: "orange" },
      { name: "Tableau", link: "/tableau-course-in-pune", Icon: LineChart, color: "sky" },
    ],
  },
  {
    title: "Development & Cloud",
    description: "Full-Stack, Cloud & Enterprise Tech",
    Icon: Code2,
    items: [
      { name: "Full-Stack with AI", link: "/full-stack-with-ai-course-in-pune", Icon: Code2, color: "blue", sapBadge: true },
      { name: "JAVA", link: "/java-course-in-pune", Icon: Braces, color: "orange" },
      { name: "AWS", link: "/aws-course-in-pune", Icon: Cloud, color: "yellow" },
      { name: "DevOps", link: "/devops-course-in-pune", Icon: ServerCog, color: "green" },
      { name: "Salesforce", link: "/salesforce-course-in-pune", Icon: Building2, color: "sky" },
    ],
  },
];
