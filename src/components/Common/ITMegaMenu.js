// components/Common/ITMegaMenu.jsx
"use client";

import MegaMenuContent from "./MegaMenuContent";
import { itMenuSections } from "./itMenuData";

export default function ITMegaMenu({ onItemClick }) {
  return <MegaMenuContent sections={itMenuSections} onItemClick={onItemClick} />;
}
