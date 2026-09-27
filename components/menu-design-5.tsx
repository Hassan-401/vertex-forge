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
 * Menu Design 5 — a promo-led grid menu. A sticky top bar (search, waiter
 * bell, phone and a "⋯" that opens the shared menu), a promotional hero
 * banner, a restaurant header with a language toggle, circular categories
 * and a two-column product grid with discount badges. Red brand accent.
 * Product details, cart and the hamburger pages (Call Waiter / WiFi /
 * Language / Branch / Rate Us) plus the bell are shared with Designs 1–4.
 * ------------------------------------------------------------------------ */

/* faint watermark food line-art behind the header */
const DOODLE = [
  "M4 13h16M4 13a8 8 0 0 1 16 0M6 17h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4Z",
  "M6 8h11a3 3 0 0 1 0 6h-1M6 8v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8M9 3v2M12 3v2M15 3v2",
  "M12 3 3 20l9-3 9 3zM12 9h.01M9.5 14h.01",
  "M6 4h12l-1.5 9a3 3 0 0 1-3 2.5h-3A3 3 0 0 1 7.5 13L6 4Z",
];

function HeaderDoodles() {
  const items = [
    { d: DOODLE[0], style: { top: "14%", insetInlineEnd: "6%", width: 40, transform: "rotate(-10deg)" } },
    { d: DOODLE[2], style: { top: "8%", insetInlineEnd: "34%", width: 30, transform: "rotate(8deg)" } },
    { d: DOODLE[3], style: { bottom: "10%", insetInlineEnd: "16%", width: 26, transform: "rotate(6deg)" } },
    { d: DOODLE[1], style: { bottom: "16%", insetInlineEnd: "44%", width: 28, transform: "rotate(-6deg)" } },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="absolute" style={{ opacity: 0.06, ...it.style }}>
          <path d={it.d} />
        </svg>
      ))}
    </div>
  );
}

/* ============================== ROOT ==================================== */

export function MenuDesign5() {
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
          <Home5
            L={L}
            locale={locale}
            cat={cat}
            setCat={setCat}
            openProduct={openProduct}
            quickAdd={quickAdd}
            onWaiter={() => setWaiterOpen(true)}
            onMore={() => setSideOpen(true)}
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

      {/* floating cart — on the list only */}
      {view === "home" && (
        <button
          onClick={() => nav("cart")}
          aria-label={L("السلة", "Cart")}
          className="absolute bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-xl transition active:scale-95"
          style={{ background: RED, insetInlineEnd: 18 }}
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

function Home5({
  L,
  locale,
  cat,
  setCat,
  openProduct,
  quickAdd,
  onWaiter,
  onMore,
  onLang,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  cat: number;
  setCat: (n: number) => void;
  openProduct: (it: MenuItem) => void;
  quickAdd: (it: MenuItem) => void;
  onWaiter: () => void;
  onMore: () => void;
  onLang: () => void;
}) {
  const category = MENU[cat];
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCat = (i: number) => {
    setCat(i);
    catRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const ic = "grid h-9 w-9 place-items-center rounded-full text-neutral-700 transition active:scale-90";

  return (
    <div className="min-h-full bg-white pb-24">
      {/* sticky top bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur">
        <div className="h-1 w-full" style={{ background: RED }} />
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <div className="flex items-center gap-0.5">
            <button aria-label={L("بحث", "Search")} className={ic}><span className="h-5 w-5">{I.search}</span></button>
            <button onClick={onWaiter} aria-label={L("نداء النادل", "Call Waiter")} className={ic}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/restaurants/bell.gif" alt="" className="h-6 w-6 object-contain" />
            </button>
            <a href={`tel:${RESTAURANT.phone}`} aria-label={L("اتصال", "Call")} className={ic}><span className="h-5 w-5">{I.phone}</span></a>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-bold">
            {category.name[locale]}
            <span className="h-3.5 w-3.5 text-rose-500">{I.pin}</span>
          </div>
          <button onClick={onMore} aria-label={L("المزيد", "More")} className={ic}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
          </button>
        </div>
      </div>

      {/* promo hero banner */}
      <div className="mx-3 mt-3 overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/restaurants/hero-template-5.webp" alt="" className="h-44 w-full object-cover" />
      </div>

      {/* restaurant header */}
      <div className="relative mt-3 px-4">
        <HeaderDoodles />
        <div className="relative flex items-start gap-3">
          <span className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1 shadow ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/master-chief.png" alt="Master Chief" className="h-full w-full object-contain" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</h1>
              <button onClick={onLang} aria-label={L("اللغة", "Language")} className="grid h-6 w-6 place-items-center rounded-full text-neutral-500" style={{ color: RED }}>
                <span className="h-4 w-4">{I.globe}</span>
              </button>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-500">
              <span className="h-3 w-3 text-rose-500">{I.pin}</span>
              {RESTAURANT.location[locale]}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-500">
              <span className="h-3 w-3">{I.phone}</span>
              {RESTAURANT.phone}
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">{L("مفتوح", "open")}</span>
        </div>
      </div>

      {/* circular category picker */}
      <div className="scrollbar-none mt-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {MENU.map((c, i) => {
          const active = i === cat;
          return (
            <button
              key={c.id}
              ref={(el) => { catRefs.current[i] = el; }}
              onClick={() => selectCat(i)}
              className="flex shrink-0 flex-col items-center gap-1.5 pt-1"
            >
              <span className={`grid h-[62px] w-[62px] place-items-center overflow-hidden rounded-full bg-neutral-50 transition ${active ? "" : "ring-1 ring-black/5"}`} style={active ? { boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${RED}` } : {}}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-full w-full object-cover" />
              </span>
              <span className={`w-[72px] whitespace-normal break-words text-center text-[11px] uppercase leading-tight tracking-wide ${active ? "font-black" : "font-bold text-neutral-400"}`} style={active ? { color: RED } : {}}>{c.name[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* two-column product grid */}
      <div className="grid grid-cols-2 gap-3 px-3 pt-4">
        {category.items.map((it, idx) => {
          const offer = idx % 3 === 0;
          return (
            <div key={it.id} className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_5px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/5">
              {/* image */}
              <button onClick={() => openProduct(it)} className="relative block h-36 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
                {offer && (
                  <span className="absolute start-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-black text-white shadow" style={{ background: RED }}>
                    {L("خصم ٢٠٪", "20% OFF")}
                  </span>
                )}
                <span className="absolute bottom-2 start-2 flex gap-1">
                  {["🔥", "🌿"].map((e, i) => (
                    <span key={i} className="grid h-6 w-6 place-items-center rounded-full bg-white/90 text-[11px] shadow-sm">{e}</span>
                  ))}
                </span>
              </button>

              <div className="flex flex-1 flex-col px-3 pb-3 pt-2">
                <button onClick={() => openProduct(it)} className="text-start">
                  <h3 className="text-sm font-black uppercase leading-tight">{it.name[locale]}</h3>
                </button>
                <p className="mt-1 text-[11px] leading-4 text-neutral-400">{it.desc[locale]}</p>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                  <span className="text-sm font-black" style={{ color: RED }}>{money(it.price, locale)}</span>
                  <button
                    onClick={() => quickAdd(it)}
                    aria-label={L("أضف إلى السلة", "Add to Cart")}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white transition active:scale-95"
                    style={{ background: RED }}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
