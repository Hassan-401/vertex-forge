"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers";
import { MENU, RESTAURANT, type MenuItem } from "@/lib/restaurants";
import type { Locale } from "@/lib/content";
import {
  RED,
  MAROON,
  MENU_FONT,
  SIZES,
  money,
  sizePriceOf,
  I,
  Toast,
  ProductView,
  CartView,
  SideMenu,
  WaiterSheet,
  WifiView,
  BranchView,
  RateView,
  type CartLine,
  type View,
} from "@/components/menu-shared";

/* --------------------------------------------------------------------------
 * Menu Design 2 — a clean, list-based e-menu. Dark cover banner with the
 * hamburger menu + language toggle, restaurant header, sticky category
 * pills, and vertical product cards (image, tags, description, price and an
 * Add-to-Cart / Options action). Product details, cart and the hamburger
 * pages (Call Waiter / WiFi / Branch / Rate Us) are shared with Design 1.
 * ------------------------------------------------------------------------ */

/* faint outline food doodles behind each product card */
const DOODLE = [
  "M4 13h16M4 13a8 8 0 0 1 16 0M6 17h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4Z",
  "M6 8h11a3 3 0 0 1 0 6h-1M6 8v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8M9 3v2M12 3v2M15 3v2",
  "M12 3 3 20l9-3 9 3zM12 9h.01M9.5 14h.01",
  "M6 4h12l-1.5 9a3 3 0 0 1-3 2.5h-3A3 3 0 0 1 7.5 13L6 4Z",
];

function CardDoodles() {
  const items = [
    { d: DOODLE[0], style: { top: "10%", insetInlineStart: "6%", width: 40, transform: "rotate(-10deg)" } },
    { d: DOODLE[2], style: { top: "8%", insetInlineEnd: "8%", width: 34, transform: "rotate(8deg)" } },
    { d: DOODLE[3], style: { bottom: "12%", insetInlineStart: "12%", width: 28, transform: "rotate(6deg)" } },
    { d: DOODLE[1], style: { bottom: "8%", insetInlineEnd: "10%", width: 30, transform: "rotate(-6deg)" } },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {items.map((it, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="absolute" style={{ opacity: 0.05, ...it.style }}>
          <path d={it.d} />
        </svg>
      ))}
    </div>
  );
}

/* three small decorative dietary chips, like the reference */
function CardTags() {
  return (
    <div className="absolute end-0 top-0 z-10 flex gap-1.5">
      {["🌿", "🌶️", "🔥"].map((e, i) => (
        <span key={i} className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] shadow-sm ring-1 ring-black/5">{e}</span>
      ))}
    </div>
  );
}

/* ============================== ROOT ==================================== */

export function MenuDesign2() {
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
  const [sideOpen, setSideOpen] = useState(false);
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

  const quickAdd = (it: MenuItem) => {
    const base = SIZES[0];
    addToCart({ item: it, size: L(base.ar, base.en), sizePrice: sizePriceOf(it, base.key), additions: [], qty: 1 });
  };

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-0 mx-auto flex max-w-[480px] flex-col overflow-hidden bg-white text-neutral-900 shadow-2xl"
      style={{ fontFamily: MENU_FONT }}
    >
      <div ref={scrollRef} className="scrollbar-none relative flex-1 overflow-y-auto scroll-smooth">
        {view === "home" && (
          <Home2
            L={L}
            locale={locale}
            cat={cat}
            setCat={setCat}
            openProduct={openProduct}
            quickAdd={quickAdd}
            openSide={() => setSideOpen(true)}
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

      {/* floating cart button — on the list only */}
      {view === "home" && (
        <button
          onClick={() => nav("cart")}
          aria-label={L("السلة", "Cart")}
          className="absolute bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-xl transition active:scale-95"
          style={{ background: RED, insetInlineStart: 18 }}
        >
          <span className="h-6 w-6">{I.cart}</span>
          {cartCount > 0 && (
            <span className="absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white ring-2 ring-white">{cartCount}</span>
          )}
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

function Home2({
  L,
  locale,
  cat,
  setCat,
  openProduct,
  quickAdd,
  openSide,
  onLang,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  cat: number;
  setCat: (n: number) => void;
  openProduct: (it: MenuItem) => void;
  quickAdd: (it: MenuItem) => void;
  openSide: () => void;
  onLang: () => void;
}) {
  const category = MENU[cat];
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCat = (i: number) => {
    setCat(i);
    pillRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const ctl = "grid h-10 w-10 place-items-center rounded-2xl bg-black/35 text-white backdrop-blur-md ring-1 ring-white/15 transition active:scale-95";

  return (
    <div className="min-h-full bg-white">
      {/* cover banner — real restaurant photo */}
      <div className="relative h-52 overflow-hidden rounded-b-[30px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/restaurants/hero-cover.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        {/* darken top for control contrast */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.15))" }} />

        {/* top controls */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <button onClick={openSide} aria-label={L("القائمة", "Menu")} className={ctl}><span className="h-5 w-5">{I.menu}</span></button>
            <button onClick={onLang} aria-label={L("اللغة", "Language")} className="grid h-10 w-10 place-items-center rounded-full text-sm font-black text-white shadow-md ring-1 ring-white/20 transition active:scale-95" style={{ background: RED }}>
              {locale === "ar" ? "En" : "ع"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a href={`tel:${RESTAURANT.phone}`} aria-label={L("اتصال", "Call")} className={ctl}><span className="h-5 w-5">{I.phone}</span></a>
            <button aria-label={L("بحث", "Search")} className={ctl}><span className="h-5 w-5">{I.search}</span></button>
          </div>
        </div>
      </div>

      {/* restaurant header — spaced below the banner */}
      <div className="flex items-center justify-between gap-3 px-4 pt-6">
        <div className="flex items-center gap-3">
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1.5 shadow-md ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/master-chief.png" alt="Master Chief" className="h-full w-full object-contain" />
          </span>
          <div className="leading-tight">
            <h1 className="text-2xl font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</h1>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
              <span className="h-3.5 w-3.5 text-rose-500">{I.pin}</span>
              {RESTAURANT.location[locale]}
            </div>
          </div>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
          {L("مفتوح", "open")}
        </span>
      </div>

      {/* sticky category pills */}
      <div className="scrollbar-none sticky top-0 z-20 mt-3 flex gap-2 overflow-x-auto border-b border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur">
        {MENU.map((c, i) => {
          const active = i === cat;
          return (
            <button
              key={c.id}
              ref={(el) => { pillRefs.current[i] = el; }}
              onClick={() => selectCat(i)}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-bold transition"
              style={active ? { background: RED, color: "#fff" } : { background: "#f4f4f5", color: "#52525b" }}
            >
              {c.name[locale]}
            </button>
          );
        })}
      </div>

      {/* product cards */}
      <div className="space-y-4 px-4 pb-28 pt-4">
        {category.items.map((it, idx) => {
          const quick = idx % 2 === 1; // vary the CTA like the reference
          return (
            <div
              key={it.id}
              className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.07)] ring-1 ring-black/5"
            >
              <CardDoodles />

              {/* tappable image → details (options) */}
              <button onClick={() => openProduct(it)} className="relative block w-full">
                <CardTags />
                <span className="grid h-40 w-full place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.image} alt="" className="h-40 w-auto max-w-full object-contain drop-shadow-[0_16px_22px_rgba(0,0,0,0.22)]" />
                </span>
              </button>

              <button onClick={() => openProduct(it)} className="relative mt-3 block text-start">
                <h3 className="text-lg font-black">{it.name[locale]}</h3>
              </button>
              <p className="relative mt-1.5 line-clamp-2 text-sm leading-6 text-neutral-500">{it.desc[locale]}</p>

              <div className="relative mt-3 flex items-center justify-between gap-3">
                <span className="text-lg font-black" style={{ color: RED }}>{money(it.price, locale)}</span>
                {quick ? (
                  <button
                    onClick={() => quickAdd(it)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm transition active:scale-95"
                    style={{ background: RED }}
                  >
                    <span className="h-4 w-4">{I.cart}</span> {L("أضف إلى السلة", "Add to Cart")}
                  </button>
                ) : (
                  <button
                    onClick={() => openProduct(it)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm transition active:scale-95"
                    style={{ background: RED }}
                  >
                    <span className="h-4 w-4">{I.sliders}</span> {L("خيارات", "Options")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
