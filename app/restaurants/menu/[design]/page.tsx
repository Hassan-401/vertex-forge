import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPreview } from "@/components/menu-preview";
import { DESIGNS, getDesign, RESTAURANT, type DesignId } from "@/lib/restaurants";

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ design: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ design: string }>;
}): Promise<Metadata> {
  const { design } = await params;
  const d = getDesign(design);
  const name = d ? d.name.en : "Menu";
  return {
    title: `${RESTAURANT.name} — ${name} | Vertex Forge`,
    description: "Display-only digital menu preview by Vertex Forge.",
  };
}

export default async function MenuDesignPage({
  params,
}: {
  params: Promise<{ design: string }>;
}) {
  const { design } = await params;
  if (!getDesign(design)) notFound();
  return <MenuPreview id={design as DesignId} />;
}
