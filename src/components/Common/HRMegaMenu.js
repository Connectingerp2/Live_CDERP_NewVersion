// components/Common/HRMegaMenu.jsx
"use client";

import MegaMenuContent from "./MegaMenuContent";
import { hrMenuSections } from "./hrMenuData";

export default function HRMegaMenu({ onItemClick }) {
  return <MegaMenuContent sections={hrMenuSections} onItemClick={onItemClick} />;
}
