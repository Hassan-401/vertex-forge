"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers";
import { MenuDesign1 } from "@/components/menu-design-1";
import { MenuDesign2 } from "@/components/menu-design-2";
import { MenuDesign3 } from "@/components/menu-design-3";
import { MenuDesign4 } from "@/components/menu-design-4";
import {
  MENU,
  RESTAURANT,
  getDesign,
  tl,
  type DesignId,
  type MenuCategory,
  type MenuItem,
} from "@/lib/restaurants";
import type { Locale } from "@/lib/content";

/* --------------------------------------------------------------------------
 * Six display-only e-menu templates for the "Master Chief" demo restaurant.
 * All read from the same MENU data; only the presentation differs so a client
 * can pick a look on the /restaurants "choose your design" grid.
 * ------------------------------------------------------------------------ */

/* helmet emblem */
function Emblem({ className, color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path
        d="M24 5c-8 0-15 6-15 15v8c0 6 5 11 11 12l4 3 4-3c6-1 11-6 11-12v-8c0-9-7-15-15-15Z"
        fill={color}
        opacity="0.18"
      />
      <path
        d="M14 22c0-6 4-11 10-11s10 5 10 11v4l-6 2h-8l-6-2v-4Z"
        fill={color}
      />
      <path d="M20 20h9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="17" cy="20" r="1.6" fill="#fff" />
    </svg>
  );
}

/* small back / demo toolbar shared by every template */
function PreviewChrome({ id }: { id: DesignId }) {
  const { locale } = useI18n();
  const d = getDesign(id)!;
  return (
    <div className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5">
        <Link
          href="/restaurants#designs"
          className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-neutral-700"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          {locale === "ar" ? "كل التصاميم" : "All designs"}
        </Link>
        <div className="text-xs font-bold text-neutral-700">
          {tl(d.name, locale)}
        </div>
        <span
          className="h-5 w-5 rounded-full border-2 border-white shadow"
          style={{ background: d.accent }}
        />
      </div>
    </div>
  );
}

/* =========================== DESIGN 5 — PRINTED ========================== */

function DesignPrinted({ locale }: { locale: Locale }) {
  const ink = "#3a2f22";
  return (
    <div
      className="min-h-screen pb-16 pt-16"
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={{ background: "#efe6d4", color: ink }}
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* header */}
        <div className="text-center">
          <Emblem className="mx-auto h-14 w-14" color="#7c5e3b" />
          <h1 className="mt-3 text-3xl font-black tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
            {locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}
          </h1>
          <p className="mt-1 text-sm italic text-[#7c5e3b]">{tl(RESTAURANT.tagline, locale)}</p>
          <div className="mx-auto mt-4 h-px w-40 bg-[#7c5e3b]/40" />
        </div>

        {/* categories as typographic sections */}
        <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {MENU.map((c) => (
            <div key={c.id} className="break-inside-avoid">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xl font-black" style={{ fontFamily: "Georgia, serif" }}>{tl(c.name, locale)}</span>
                <span className="h-px flex-1 bg-[#7c5e3b]/30" />
              </div>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.id}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold">{tl(it.name, locale)}</span>
                      <span className="min-w-6 flex-1 border-b border-dotted border-[#7c5e3b]/40" />
                      <span className="font-black text-[#7c5e3b]">{it.price}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6b5b45]">{tl(it.desc, locale)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* footer */}
        <div className="mt-12 border-t border-[#7c5e3b]/30 pt-5 text-center text-xs text-[#7c5e3b]">
          <p>{tl(RESTAURANT.location, locale)} · {tl(RESTAURANT.hours, locale)}</p>
          <div className="mt-3 flex items-center justify-center gap-3 text-lg">
            <span>📷</span><span>📘</span><span>🎵</span><span>💬</span>
          </div>
          <p className="mt-2 text-[10px]">
            {locale === "ar" ? "الأسعار شاملة الضريبة والخدمة" : "Prices include tax & service"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================== DESIGN 6 — POSTER =========================== */

function DesignPoster({ locale }: { locale: Locale }) {
  const posters = [
    "/restaurants/template6/menu-1.png",
    "/restaurants/template6/menu-2.png",
    "/restaurants/template6/menu-3.png",
  ];
  const [i, setI] = useState(0);
  return (
    <div className="min-h-screen bg-neutral-900 pb-16 pt-20 text-neutral-100" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Emblem className="h-10 w-10" color="#e8a33d" />
          <div className="text-left rtl:text-right">
            <div className="text-lg font-black" style={{ color: "#e8a33d" }}>{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
            <div className="text-[11px] text-neutral-400">{tl(RESTAURANT.tagline, locale)}</div>
          </div>
        </div>

        {/* poster */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={posters[i]} alt={`menu ${i + 1}`} className="h-full w-full object-contain" />
        </div>

        {/* dots + arrows */}
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            onClick={() => setI((v) => (v - 1 + posters.length) % posters.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div className="flex gap-2">
            {posters.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className="h-2.5 rounded-full transition-all"
                style={{ width: k === i ? 26 : 10, background: k === i ? "#e8a33d" : "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>
          <button
            onClick={() => setI((v) => (v + 1) % posters.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
        <p className="mt-4 text-xs text-neutral-500">
          {locale === "ar" ? `صفحة ${i + 1} من ${posters.length}` : `Page ${i + 1} of ${posters.length}`}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ dispatcher ------------------------------- */

export function MenuPreview({ id }: { id: DesignId }) {
  const { locale } = useI18n();

  // Designs 1 & 2 are full immersive ordering mini-apps — no preview chrome.
  if (id === "1") return <MenuDesign1 />;
  if (id === "2") return <MenuDesign2 />;
  if (id === "3") return <MenuDesign3 />;
  if (id === "4") return <MenuDesign4 />;

  const body = (() => {
    switch (id) {
      case "5": return <DesignPrinted locale={locale} />;
      case "6": return <DesignPoster locale={locale} />;
    }
  })();
  return (
    <>
      <PreviewChrome id={id} />
      {body}
    </>
  );
}

/* avoid unused warnings for exported helper types */
export type { MenuCategory, MenuItem };
