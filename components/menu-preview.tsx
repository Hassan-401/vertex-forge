"use client";

import { MenuDesign1 } from "@/components/menu-design-1";
import { MenuDesign2 } from "@/components/menu-design-2";
import { MenuDesign3 } from "@/components/menu-design-3";
import { MenuDesign4 } from "@/components/menu-design-4";
import { MenuDesign5 } from "@/components/menu-design-5";
import { MenuDesign6 } from "@/components/menu-design-6";
import type { DesignId } from "@/lib/restaurants";

/* --------------------------------------------------------------------------
 * Six e-menu templates for the "Master Chief" demo restaurant. Each is its
 * own immersive component so a client can preview a look on the /restaurants
 * "choose your design" grid. Designs 1–5 are front-end ordering mini-apps;
 * Design 6 is a display-only, image-based menu (scroll / book).
 * ------------------------------------------------------------------------ */

export function MenuPreview({ id }: { id: DesignId }) {
  switch (id) {
    case "1": return <MenuDesign1 />;
    case "2": return <MenuDesign2 />;
    case "3": return <MenuDesign3 />;
    case "4": return <MenuDesign4 />;
    case "5": return <MenuDesign5 />;
    case "6": return <MenuDesign6 />;
  }
}
