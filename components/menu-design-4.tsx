"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/components/providers";
import { MENU, RESTAURANT, type MenuItem } from "@/lib/restaurants";
import type { Locale } from "@/lib/content";
import {
  MENU_FONT,
  I,
  Toast,
  ProductView,
  CartView,
  WaiterSheet,
  WifiView,
  BranchView,
  RateView,
  type CartLine,
  type View,
} from "@/components/menu-shared";

/* --------------------------------------------------------------------------
 * Menu Design 4 — a bright fast-food layout. White page with a search bar,
 * circular category picker and a two-column product grid of "Options" cards,
 * plus a fixed bottom navigation bar. Orange brand accent with black primary
 * buttons. The shared product details / cart / hamburger pages (Call Waiter /
 * WiFi / Language / Branch / Rate Us) and the bell are reused; the shared
 * views re-theme to black via the --menu-accent variable set on the root.
 * ------------------------------------------------------------------------ */

const ORANGE = "#f5821f";
const INK = "#161616"; // primary (black) buttons in the shared views

/* faint watermark food line-art behind each product card */
const DOODLE = [
  "M4 13h16M4 13a8 8 0 0 1 16 0M6 17h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4Z",
  "M12 3 3 20l9-3 9 3zM12 9h.01M9.5 14h.01",
  "M6 4h12l-1.5 9a3 3 0 0 1-3 2.5h-3A3 3 0 0 1 7.5 13L6 4Z",
];

/* serving-dome (cloche) icon for the bottom nav */
const cloche = (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 18h17M5 18a7 7 0 0 1 14 0M12 5v3M10 5h4" /><circle cx="12" cy="8" r="0.4" fill="currentColor" />
  </svg>
);

/* ============================== ROOT ==================================== */

export function MenuDesign4() {
  const { locale, toggleLocale } = useI18n();
  const L = (ar: string, en: string) => (locale === "ar" ? ar : en);
  const rtl = locale === "ar";

  const [stack, setStack] = useState<View[]>(["home"]);
  const view = stack[stack.length - 1];
  const nav = (v: View) => setStack((s) => [...s, v]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const goHome = () => setStack(["home"]);

  const [cat, setCat] = useState(0);
  const [product, setProduct] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [waiterOpen, setWaiterOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce(
    (s, l) => s + (l.sizePrice + l.additions.reduce((a, x) => a + x.price, 0)) * l.qty,
    0,
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1900);
    return () => clearTimeout(t);
  }, [toast]);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [view]);

  const openProduct = (it: MenuItem) => {
    setProduct(it);
    nav("product");
  };

  const addToCart = (line: Omit<CartLine, "uid">) => {
    setCart((c) => [...c, { ...line, uid: Math.random().toString(36).slice(2) }]);
    setToast(L("تمت الإضافة إلى السلة", "Added to cart"));
  };

  const rootStyle = { fontFamily: MENU_FONT, ["--menu-accent"]: INK } as CSSProperties;

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-0 mx-auto flex max-w-[480px] flex-col overflow-hidden bg-white text-neutral-900 shadow-2xl"
      style={rootStyle}
    >
      <div ref={scrollRef} className="scrollbar-none relative flex-1 overflow-y-auto scroll-smooth">
        {view === "home" && (
          <Home4
            L={L}
            locale={locale}
            cat={cat}
            setCat={setCat}
            openProduct={openProduct}
            onWaiter={() => setWaiterOpen(true)}
            onWifi={() => nav("wifi")}
            onLang={toggleLocale}
          />
        )}
        {view === "product" && product && (
          <ProductView
            L={L}
            locale={locale}
            item={product}
            onBack={back}
            onHome={goHome}
            openCart={() => nav("cart")}
            cartCount={cartCount}
            add={addToCart}
          />
        )}
        {view === "cart" && (
          <CartView
            L={L}
            locale={locale}
            cart={cart}
            setCart={setCart}
            total={cartTotal}
            onBack={back}
            onHome={goHome}
            onOrder={() => {
              setCart([]);
              setToast(L("تم إرسال طلبك بنجاح ✅", "Your order was placed ✅"));
              goHome();
            }}
          />
        )}
        {view === "wifi" && <WifiView L={L} onBack={back} onHome={goHome} setToast={setToast} />}
        {view === "branch" && (
          <BranchView L={L} locale={locale} onBack={back} onHome={goHome} openRate={() => nav("rate")} />
        )}
        {view === "rate" && <RateView L={L} onBack={back} onHome={goHome} setToast={setToast} />}
      </div>

      {/* fixed bottom navigation — on the list only */}
      {view === "home" && (
        <BottomNav
          L={L}
          onHome={goHome}
          onRate={() => nav("rate")}
          onBranch={() => nav("branch")}
          onCart={() => nav("cart")}
          cartCount={cartCount}
        />
      )}

      {waiterOpen && <WaiterSheet L={L} onClose={() => setWaiterOpen(false)} setToast={setToast} />}
      {toast && <Toast msg={toast} />}
    </div>
  );
}

/* ============================= BOTTOM NAV ================================ */

function BottomNav({
  L,
  onHome,
  onRate,
  onBranch,
  onCart,
  cartCount,
}: {
  L: (a: string, e: string) => string;
  onHome: () => void;
  onRate: () => void;
  onBranch: () => void;
  onCart: () => void;
  cartCount: number;
}) {
  const item = (label: string, icon: React.ReactNode, on: () => void, badge?: number) => (
    <button onClick={on} aria-label={label} className="relative grid flex-1 place-items-center py-1 text-neutral-400 transition active:scale-90">
      <span className="h-6 w-6">{icon}</span>
      {badge ? (
        <span className="absolute end-5 top-0 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: ORANGE }}>{badge}</span>
      ) : null}
    </button>
  );

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-center bg-white px-3 py-2.5 shadow-[0_-6px_24px_rgba(0,0,0,0.08)]">
      {item(L("الرئيسية", "Home"), I.home, onHome)}
      {/* active: menu */}
      <button aria-label={L("المنيو", "Menu")} className="grid flex-1 place-items-center py-1">
        <span className="grid h-11 w-11 place-items-center rounded-2xl text-white shadow-md" style={{ background: ORANGE }}>
          <span className="h-6 w-6">{cloche}</span>
        </span>
      </button>
      {item(L("قيّمنا", "Rate Us"), I.star, onRate)}
      {item(L("بيانات الفرع", "Branch Details"), I.info, onBranch)}
      {item(L("السلة", "Cart"), I.bag, onCart, cartCount)}
    </div>
  );
}

/* ================================ HOME =================================== */

function Home4({
  L,
  locale,
  cat,
  setCat,
  openProduct,
  onWaiter,
  onWifi,
  onLang,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  cat: number;
  setCat: (n: number) => void;
  openProduct: (it: MenuItem) => void;
  onWaiter: () => void;
  onWifi: () => void;
  onLang: () => void;
}) {
  const category = MENU[cat];
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCat = (i: number) => {
    setCat(i);
    catRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const ctl = "grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition active:scale-95";

  return (
    <div className="min-h-full bg-white pb-24">
      {/* header */}
      <div className="flex items-center justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-0.5 shadow ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/master-chief.png" alt="Master Chief" className="h-full w-full object-contain" />
          </span>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: ORANGE }}>{L("مفتوح", "open")}</span>
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-500">
              <span className="h-3 w-3 text-rose-500">{I.pin}</span>
              {RESTAURANT.location[locale]}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={onLang} aria-label={L("اللغة", "Language")} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-sm font-black text-neutral-700 transition active:scale-95">
            {locale === "ar" ? "En" : "ع"}
          </button>
          <button onClick={onWaiter} aria-label={L("نداء النادل", "Call Waiter")} className={ctl}><span className="h-5 w-5" style={{ color: ORANGE }}>{I.bell}</span></button>
          <button onClick={onWifi} aria-label={L("الواي فاي", "WiFi")} className={ctl}><span className="h-5 w-5">{I.wifi}</span></button>
        </div>
      </div>

      {/* hero headline */}
      <h1 className="px-4 pt-5 text-[26px] font-black leading-8">
        {L("طعم أصيل وخدمة مميزة", "Authentic taste, premium service")} 🤤🍔
      </h1>

      {/* search */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 px-4 py-3">
          <span className="h-5 w-5 text-neutral-400">{I.search}</span>
          <span className="text-sm text-neutral-400">{L("ابحث عن وجبتك...", "Search for fast food...")}</span>
        </div>
      </div>

      {/* circular category picker */}
      <div className="scrollbar-none mt-5 flex gap-3 overflow-x-auto px-4 pb-2">
        {MENU.map((c, i) => {
          const active = i === cat;
          return (
            <button
              key={c.id}
              ref={(el) => { catRefs.current[i] = el; }}
              onClick={() => selectCat(i)}
              className="flex shrink-0 flex-col items-center gap-2 pt-1"
            >
              <span className={`grid h-[70px] w-[70px] place-items-center overflow-hidden rounded-full bg-neutral-50 transition ${active ? "ring-2 ring-offset-2" : "ring-1 ring-black/5"}`} style={active ? { boxShadow: `0 0 0 2px ${ORANGE}` } : {}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span className={`max-w-[80px] truncate text-center text-xs ${active ? "font-black text-neutral-900" : "font-bold text-neutral-400"}`}>{c.name[locale]}</span>
              <span className="h-1 w-6 rounded-full transition" style={{ background: active ? "#111" : "transparent" }} />
            </button>
          );
        })}
      </div>

      {/* two-column product grid */}
      <div className="grid grid-cols-2 gap-3 px-3 pt-3">
        {category.items.map((it, idx) => (
          <button
            key={it.id}
            onClick={() => openProduct(it)}
            className="relative flex flex-col overflow-hidden rounded-3xl bg-white text-start shadow-[0_5px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
          >
            {/* watermark */}
            <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute -right-2 -top-2 h-16 w-16" style={{ opacity: 0.04 }}>
              <path d={DOODLE[idx % DOODLE.length]} />
            </svg>

            <span className="grid h-28 w-full place-items-center px-3 pt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt="" className="h-28 w-auto max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.2)]" />
            </span>

            {/* dietary chips */}
            <span className="mt-2 flex items-center justify-center gap-1.5">
              {["🌿", "🌶️", "🔥"].map((e, i) => (
                <span key={i} className="grid h-6 w-6 place-items-center rounded-full bg-neutral-100 text-[11px]">{e}</span>
              ))}
            </span>

            <div className="px-3 pt-2">
              <h3 className="truncate text-sm font-black">{it.name[locale]}</h3>
              <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-400">{it.desc[locale]}</p>
            </div>

            {/* options footer */}
            <div className="mt-2 flex items-center justify-between border-t border-neutral-100 px-3 py-2.5">
              <span className="text-sm font-bold text-neutral-600">{L("خيارات", "Options")}</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-neutral-100 text-neutral-500">
                <span className="h-4 w-4 rtl:rotate-180">{I.chevron}</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
