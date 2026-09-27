"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers";
import {
  MENU,
  RESTAURANT,
  getDesign,
  tl,
  type DesignId,
  type MenuCategory,
  type MenuItem,
  type MenuTag,
} from "@/lib/restaurants";
import type { Locale } from "@/lib/content";

/* --------------------------------------------------------------------------
 * Six display-only e-menu templates for the "Master Chief" demo restaurant.
 * All read from the same MENU data; only the presentation differs so a client
 * can pick a look on the /restaurants "choose your design" grid.
 * ------------------------------------------------------------------------ */

const tagEmoji: Record<MenuTag, string> = {
  spicy: "🌶️",
  veg: "🌱",
  hot: "🔥",
  new: "✨",
  offer: "٪",
};

function priceText(p: number, locale: Locale) {
  return `${p} ${tl(RESTAURANT.currency, locale)}`;
}

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
          {tl(d.name, locale)} · {locale === "ar" ? "منيو تجريبي" : "demo menu"}
        </div>
        <span
          className="h-5 w-5 rounded-full border-2 border-white shadow"
          style={{ background: d.accent }}
        />
      </div>
    </div>
  );
}

function Tags({ tags, locale }: { tags?: MenuTag[]; locale: Locale }) {
  if (!tags?.length) return null;
  return (
    <span className="inline-flex items-center gap-1">
      {tags.map((tg) =>
        tg === "new" || tg === "offer" ? (
          <span
            key={tg}
            className="rounded-full bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white"
          >
            {tg === "new" ? (locale === "ar" ? "جديد" : "New") : locale === "ar" ? "عرض" : "Offer"}
          </span>
        ) : (
          <span key={tg} className="text-sm leading-none">
            {tagEmoji[tg]}
          </span>
        ),
      )}
    </span>
  );
}

/* ============================ DESIGN 1 — CLASSIC ========================== */

function DesignClassic({ locale }: { locale: Locale }) {
  const [cat, setCat] = useState(0);
  const category = MENU[cat];
  const [featured, ...rest] = category.items;
  return (
    <div className="min-h-screen bg-neutral-50 pb-28 pt-14 text-neutral-900" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[430px]">
        {/* curved header */}
        <div className="relative overflow-hidden rounded-b-[2.5rem] bg-gradient-to-b from-red-700 to-red-600 px-5 pb-8 pt-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Emblem className="h-11 w-11" color="#fff" />
              <div>
                <div className="text-lg font-black leading-none">
                  {locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-white/80">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>
                  {tl(RESTAURANT.location, locale)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg></span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg></span>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/90">{tl(RESTAURANT.tagline, locale)}</p>
        </div>

        {/* circular categories */}
        <div className="scrollbar-none -mt-5 flex gap-3 overflow-x-auto px-4 pb-2 pt-2">
          {MENU.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setCat(i)}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              <span
                className={`grid h-16 w-16 place-items-center overflow-hidden rounded-full border-2 bg-white transition ${
                  i === cat ? "border-red-600 shadow-lg" : "border-neutral-200"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span className={`max-w-16 truncate text-[10px] font-bold ${i === cat ? "text-red-600" : "text-neutral-500"}`}>
                {tl(c.name, locale)}
              </span>
            </button>
          ))}
        </div>

        {/* featured */}
        <div className="px-4 pt-3">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5">
            <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold">{tl(featured.name, locale)}</h3>
                <Tags tags={featured.tags} locale={locale} />
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{tl(featured.desc, locale)}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-black text-red-600">{priceText(featured.price, locale)}</span>
                <button className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white">
                  {locale === "ar" ? "أضف للطلب" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* rest list */}
        <div className="space-y-3 px-4 pt-4">
          {rest.map((it) => (
            <div key={it.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="truncate font-bold">{tl(it.name, locale)}</h4>
                  <Tags tags={it.tags} locale={locale} />
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">{tl(it.desc, locale)}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="font-black text-red-600">{priceText(it.price, locale)}</span>
                  {it.kcal && <span className="text-[10px] text-neutral-400">🔥 {it.kcal} kcal</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* floating cart */}
      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <button className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-xl">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
          {locale === "ar" ? "عرض الطلب" : "View order"}
        </button>
      </div>
    </div>
  );
}

/* ============================= DESIGN 2 — LIST =========================== */

function DesignList({ locale }: { locale: Locale }) {
  const [cat, setCat] = useState(0);
  const category = MENU[cat];
  const accent = "#0f766e";
  return (
    <div className="min-h-screen bg-neutral-100 pb-24 pt-12 text-neutral-900" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[430px] bg-white">
        {/* hero cover */}
        <div className="relative h-44 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={category.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Emblem className="h-8 w-8" color="#fff" />
              </span>
              <div>
                <div className="text-lg font-black leading-none">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
                <div className="mt-1 text-[11px] text-white/80">{tl(RESTAURANT.location, locale)}</div>
              </div>
            </div>
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: accent }}>
              {tl(RESTAURANT.hours, locale)}
            </span>
          </div>
        </div>

        {/* pills */}
        <div className="scrollbar-none sticky top-12 z-10 flex gap-2 overflow-x-auto bg-white px-4 py-3 shadow-sm">
          {MENU.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setCat(i)}
              className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition"
              style={i === cat ? { background: accent, color: "#fff" } : { background: "#f1f5f4", color: "#475569" }}
            >
              {tl(c.name, locale)}
            </button>
          ))}
        </div>

        {/* list rows */}
        <div className="divide-y divide-neutral-100">
          {category.items.map((it) => (
            <div key={it.id} className="flex gap-3 p-4">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-1.5">
                  <h4 className="truncate font-extrabold">{tl(it.name, locale)}</h4>
                  <Tags tags={it.tags} locale={locale} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">{tl(it.desc, locale)}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-black" style={{ color: accent }}>{priceText(it.price, locale)}</span>
                  <button
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-bold"
                    style={{ borderColor: accent, color: accent }}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                    {locale === "ar" ? "خيارات" : "Options"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[430px] border-t border-neutral-200 bg-white/95 px-8 py-3 backdrop-blur">
        <div className="flex items-center justify-between text-neutral-400">
          {["🏠", "🍴", "🔍", "🛒"].map((e, i) => (
            <span key={i} className={`text-xl ${i === 0 ? "opacity-100" : "opacity-50"}`}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= DESIGN 3 — GRID =========================== */

function DesignGrid({ locale }: { locale: Locale }) {
  const [cat, setCat] = useState(0);
  const category = MENU[cat];
  const accent = "#c2410c";
  return (
    <div className="min-h-screen bg-neutral-100 pb-16 pt-12 text-neutral-900" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[440px]">
        {/* banner */}
        <div className="relative m-3 overflow-hidden rounded-3xl" style={{ background: accent }}>
          <div className="flex items-center justify-between p-5 text-white">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wide text-white/70">{locale === "ar" ? "عرض اليوم" : "Today's offer"}</div>
              <div className="mt-1 text-2xl font-black leading-tight">{locale === "ar" ? "خصم ٢٥٪" : "25% OFF"}</div>
              <div className="mt-1 text-xs text-white/80">{locale === "ar" ? "على الوجبات المميزة" : "on signature meals"}</div>
            </div>
            <Emblem className="h-16 w-16" color="#fff" />
          </div>
        </div>

        {/* logo card */}
        <div className="mx-3 -mt-1 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${accent}1a` }}>
            <Emblem className="h-8 w-8" color={accent} />
          </span>
          <div className="flex-1">
            <div className="font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
            <div className="text-[11px] text-neutral-500">{tl(RESTAURANT.location, locale)}</div>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{locale === "ar" ? "مفتوح" : "open"}</span>
        </div>

        {/* circular cats */}
        <div className="scrollbar-none flex gap-3 overflow-x-auto px-3 py-4">
          {MENU.map((c, i) => (
            <button key={c.id} onClick={() => setCat(i)} className="flex shrink-0 flex-col items-center gap-1.5">
              <span className={`grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border-2 bg-white transition ${i === cat ? "shadow-md" : "border-transparent"}`} style={i === cat ? { borderColor: accent } : {}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="max-w-14 truncate text-[10px] font-bold" style={{ color: i === cat ? accent : "#64748b" }}>{tl(c.name, locale)}</span>
            </button>
          ))}
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-2 gap-3 px-3">
          {category.items.map((it, idx) => (
            <div key={it.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
                {idx % 3 === 0 && (
                  <span className="absolute top-2 start-2 rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold text-white">
                    {locale === "ar" ? "٢٠٪ خصم" : "20% OFF"}
                  </span>
                )}
                <span className="absolute bottom-2 end-2"><Tags tags={it.tags} locale={locale} /></span>
              </div>
              <div className="p-3">
                <h4 className="truncate text-sm font-extrabold">{tl(it.name, locale)}</h4>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-500">{tl(it.desc, locale)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-black" style={{ color: accent }}>{priceText(it.price, locale)}</span>
                  <button className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: accent }}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================= DESIGN 4 — DARK =========================== */

function DesignDark({ locale }: { locale: Locale }) {
  const [cat, setCat] = useState(0);
  const category = MENU[cat];
  const gold = "#d4a017";
  return (
    <div className="min-h-screen bg-neutral-950 pb-16 pt-12 text-neutral-100" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[440px]">
        {/* cover */}
        <div className="relative h-52 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={category.image} alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center gap-3">
              <Emblem className="h-12 w-12" color={gold} />
              <div>
                <div className="text-xl font-black" style={{ color: gold }}>{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
                <div className="text-[11px] text-neutral-300">{tl(RESTAURANT.tagline, locale)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* tabs */}
        <div className="scrollbar-none flex gap-5 overflow-x-auto border-b border-white/10 px-5 py-3">
          {MENU.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setCat(i)}
              className="shrink-0 border-b-2 pb-2 text-sm font-bold transition"
              style={i === cat ? { color: gold, borderColor: gold } : { color: "#8a8a8a", borderColor: "transparent" }}
            >
              {tl(c.name, locale)}
            </button>
          ))}
        </div>

        {/* cards */}
        <div className="space-y-4 p-5">
          {category.items.map((it) => (
            <div key={it.id} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-1.5">
                  <h4 className="truncate font-extrabold">{tl(it.name, locale)}</h4>
                  <Tags tags={it.tags} locale={locale} />
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-400">{tl(it.desc, locale)}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-black" style={{ color: gold }}>{priceText(it.price, locale)}</span>
                  <button className="rounded-full border px-3 py-1 text-xs font-bold" style={{ borderColor: gold, color: gold }}>
                    {locale === "ar" ? "أضف" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
  const body = (() => {
    switch (id) {
      case "1": return <DesignClassic locale={locale} />;
      case "2": return <DesignList locale={locale} />;
      case "3": return <DesignGrid locale={locale} />;
      case "4": return <DesignDark locale={locale} />;
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
