// components/Common/SAPMegaMenu.jsx
"use client";

import MegaMenuContent from "./MegaMenuContent";
import { sapMenuSections } from "./sapMenuData";

export default function SAPMegaMenu({ onItemClick }) {
  return <MegaMenuContent sections={sapMenuSections} onItemClick={onItemClick} />;
}
