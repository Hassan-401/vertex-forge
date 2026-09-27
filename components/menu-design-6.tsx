"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers";
import { RESTAURANT } from "@/lib/restaurants";
import type { Locale } from "@/lib/content";
import {
  MENU_FONT,
  I,
  Toast,
  SideMenu,
  WaiterSheet,
  WifiView,
  BranchView,
  RateView,
  type View,
} from "@/components/menu-shared";

/* --------------------------------------------------------------------------
 * Menu Design 6 — a display-only, image-based menu (no ordering). The menu
 * is a set of designed pages shown two ways: "Scroll" (pages stacked) and
 * "Book" (one page at a time with a page-turn). A dark elegant top bar, a
 * restaurant header with social links, and the shared service features:
 * the floating bell and the hamburger menu (Call Waiter / WiFi / Language /
 * Branch / Rate Us).
 * ------------------------------------------------------------------------ */

// reading order: cover, the three content pages, then the thank-you page.
// (The source files number the cover/thank-you as 1 & 2 and the content
// pages as 3–5, so the display order is not a plain ascending sort.)
const PAGES = [
  "/restaurants/template6/menu-1.png", // cover
  "/restaurants/template6/menu-3.png", // content 1 of 3 — appetizers
  "/restaurants/template6/menu-4.png", // content 2 of 3 — mains
  "/restaurants/template6/menu-5.png", // content 3 of 3
  "/restaurants/template6/menu-2.png", // thank you
];

const GOLD = "#d8b877";
const DARK = "#2a1116";

type Mode = "scroll" | "book";

/* social links (display only) */
const SOCIALS: { name: string; bg: string; icon: React.ReactNode }[] = [
  { name: "WhatsApp", bg: "#25D366", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1Z"/></svg> },
  { name: "TikTok", bg: "#000000", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M16 3c.3 2 1.6 3.6 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1v6.1a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V3z"/></svg> },
  { name: "Snapchat", bg: "#FFFC00", icon: <svg viewBox="0 0 24 24" fill="#111" className="h-4 w-4"><path d="M12 3c2.3 0 3.7 1.7 3.8 3.9v1.6c.5.3 1-.4 1.6-.1.5.4-.2 1-.9 1.4-.4.2-.9.3-.8.8.3 1.2 2 2.1 3 2.4.4.1.4.5 0 .8-.5.3-1.3.3-1.5.7-.1.4.3.7 0 1-.4.3-1.4-.2-2.3.1-.7.3-.9 1.3-1.7 1.6-1 .3-2-.6-3.2-.6s-2.2.9-3.2.6c-.8-.3-1-1.3-1.7-1.6-.9-.3-1.9.2-2.3-.1-.3-.3.1-.6 0-1-.2-.4-1-.4-1.5-.7-.4-.3-.4-.7 0-.8 1-.3 2.7-1.2 3-2.4.1-.5-.4-.6-.8-.8-.7-.4-1.4-1-.9-1.4.6-.3 1.1.4 1.6.1V6.9C8.3 4.7 9.7 3 12 3Z"/></svg> },
  { name: "X", bg: "#000000", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5"><path d="M18 2h3l-7 8 8 12h-6l-5-7-5 7H3l7-9L2 2h6l4 6 6-6z"/></svg> },
  { name: "Instagram", bg: "#E1306C", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { name: "YouTube", bg: "#FF0000", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M22 8.2a3 3 0 0 0-2-2C18.2 5.7 12 5.7 12 5.7s-6.2 0-8 .5a3 3 0 0 0-2 2C1.5 10 1.5 12 1.5 12s0 2 .5 3.8a3 3 0 0 0 2 2c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2-2c.5-1.8.5-3.8.5-3.8s0-2-.5-3.8ZM10 15V9l5 3z"/></svg> },
  { name: "Facebook", bg: "#1877F2", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h2.5l.5-4H12V7.5c0-.6.4-1 1-1h2z"/></svg> },
];

/* ============================== ROOT ==================================== */

export function MenuDesign6() {
  const { locale, toggleLocale } = useI18n();
  const L = (ar: string, en: string) => (locale === "ar" ? ar : en);
  const rtl = locale === "ar";

  const [stack, setStack] = useState<View[]>(["home"]);
  const view = stack[stack.length - 1];
  const nav = (v: View) => setStack((s) => [...s, v]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const goHome = () => setStack(["home"]);

  const [waiterOpen, setWaiterOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [view]);

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-0 mx-auto flex max-w-[480px] flex-col overflow-hidden bg-white text-neutral-900 shadow-2xl"
      style={{ fontFamily: MENU_FONT }}
    >
      <div ref={scrollRef} className="scrollbar-none relative flex-1 overflow-y-auto scroll-smooth">
        {view === "home" && <Home6 L={L} locale={locale} openSide={() => setSideOpen(true)} />}
        {view === "wifi" && <WifiView L={L} onBack={back} onHome={goHome} setToast={setToast} />}
        {view === "branch" && (
          <BranchView L={L} locale={locale} onBack={back} onHome={goHome} openRate={() => nav("rate")} />
        )}
        {view === "rate" && <RateView L={L} onBack={back} onHome={goHome} setToast={setToast} />}
      </div>

      {/* floating waiter bell — the shared constant */}
      {view === "home" && (
        <button
          onClick={() => setWaiterOpen(true)}
          aria-label={L("نداء النادل", "Call waiter")}
          className="absolute bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-white shadow-xl ring-1 ring-black/5 transition active:scale-95"
          style={{ insetInlineEnd: 18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/restaurants/bell.gif" alt="" className="h-10 w-10 object-contain" />
        </button>
      )}

      {waiterOpen && <WaiterSheet L={L} onClose={() => setWaiterOpen(false)} setToast={setToast} />}
      {sideOpen && (
        <SideMenu
          L={L}
          onClose={() => setSideOpen(false)}
          onWaiter={() => { setSideOpen(false); setWaiterOpen(true); }}
          onWifi={() => { setSideOpen(false); nav("wifi"); }}
          onLang={() => { toggleLocale(); }}
          onBranch={() => { setSideOpen(false); nav("branch"); }}
          onRate={() => { setSideOpen(false); nav("rate"); }}
        />
      )}

      {toast && <Toast msg={toast} />}
    </div>
  );
}

/* ================================ HOME =================================== */

function Home6({
  L,
  locale,
  openSide,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  openSide: () => void;
}) {
  const [mode, setMode] = useState<Mode>("scroll");
  const [page, setPage] = useState(0);

  const ctl = "grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20 transition active:scale-95";

  const modeTab = (m: Mode, label: string, icon: React.ReactNode) => {
    const active = mode === m;
    return (
      <button
        onClick={() => setMode(m)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition"
        style={active ? { background: GOLD, color: DARK } : { background: "rgba(255,255,255,0.15)", color: "#fff" }}
      >
        <span className="h-4 w-4">{icon}</span>
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-full bg-neutral-100">
      {/* dark elegant top bar */}
      <div className="sticky top-0 z-30" style={{ background: `linear-gradient(160deg, ${DARK}, #1c0b0f)` }}>
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            {modeTab("scroll", L("تمرير", "Scroll"), I.menu)}
            {modeTab("book", L("كتاب", "Book"), <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full"><path d="M12 6c-1.5-1-4-1.5-6-1.5S2.5 5 2 5.5v13c1-.5 3.5-1 5.5-1s4.5.5 6 1.5m-1.5-13c1.5-1 4-1.5 6-1.5s3.5.5 4 1v13c-1-.5-3-1-5-1s-4.5.5-6 1.5m0-13v13" /></svg>)}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-base font-black text-white">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
            <a href={`tel:${RESTAURANT.phone}`} aria-label={L("اتصال", "Call")} className={ctl}><span className="h-4 w-4">{I.phone}</span></a>
            <button onClick={openSide} aria-label={L("القائمة", "Menu")} className={ctl}><span className="h-4 w-4">{I.menu}</span></button>
          </div>
        </div>
      </div>

      {/* restaurant header card */}
      <div className="bg-white px-4 pb-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">{L("مفتوح", "open")}</span>
          <div className="min-w-0 flex-1 text-end leading-tight">
            <div className="flex items-center justify-end gap-2">
              <h1 className="truncate text-lg font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</h1>
              <span className="h-4 w-4 text-neutral-400">{I.doc}</span>
            </div>
            <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-neutral-500">
              {RESTAURANT.location[locale]}
              <span className="h-3 w-3 text-rose-500">{I.pin}</span>
            </div>
            <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-neutral-500">
              {RESTAURANT.phone}
              <span className="h-3 w-3">{I.phone}</span>
            </div>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 shadow-md ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/master-chief.png" alt="Master Chief" className="h-full w-full object-contain" />
          </span>
        </div>

        {/* social links */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {SOCIALS.map((s) => (
            <span key={s.name} aria-label={s.name} className="grid h-9 w-9 place-items-center rounded-full text-white shadow-sm" style={{ background: s.bg }}>
              {s.icon}
            </span>
          ))}
        </div>
      </div>

      {/* menu pages */}
      {mode === "scroll" ? (
        <div className="bg-neutral-900">
          {PAGES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt={`${L("صفحة المنيو", "Menu page")} ${i + 1}`} className="block w-full" />
          ))}
        </div>
      ) : (
        <BookView L={L} page={page} setPage={setPage} />
      )}
    </div>
  );
}

/* ============================== BOOK VIEW =============================== */

function BookView({
  L,
  page,
  setPage,
}: {
  L: (a: string, e: string) => string;
  page: number;
  setPage: (n: number) => void;
}) {
  const total = PAGES.length;
  const go = (d: number) => setPage(Math.min(total - 1, Math.max(0, page + d)));

  return (
    <div className="flex flex-col items-center gap-4 bg-neutral-900 px-3 pb-10 pt-5">
      {/* page */}
      <div className="w-full overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10" style={{ perspective: 1400 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={page}
          src={PAGES[page]}
          alt={`${L("صفحة المنيو", "Menu page")} ${page + 1}`}
          className="menu6-flip block w-full"
        />
      </div>

      {/* controls */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => go(-1)}
          disabled={page === 0}
          aria-label={L("السابق", "Previous")}
          className="grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-white/25 transition enabled:active:scale-95 disabled:opacity-30"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <span className="h-5 w-5 rtl:rotate-180">{I.back}</span>
        </button>

        <div className="min-w-16 text-center text-sm font-bold text-white/90" dir="ltr">
          {page + 1} / {total}
        </div>

        <button
          onClick={() => go(1)}
          disabled={page === total - 1}
          aria-label={L("التالي", "Next")}
          className="grid h-11 w-11 place-items-center rounded-full text-white ring-1 ring-white/25 transition enabled:active:scale-95 disabled:opacity-30"
          style={{ background: GOLD, color: DARK }}
        >
          <span className="h-5 w-5 rotate-180 rtl:rotate-0">{I.back}</span>
        </button>
      </div>

      {/* page dots */}
      <div className="flex gap-2">
        {PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            aria-label={`${L("صفحة", "Page")} ${i + 1}`}
            className="h-2 rounded-full transition-all"
            style={{ width: i === page ? 22 : 8, background: i === page ? GOLD : "rgba(255,255,255,0.3)" }}
          />
        ))}
      </div>
    </div>
  );
}
