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
 * Menu Design 3 — a compact, row-based e-menu. Photo cover banner with the
 * hamburger menu + language toggle, restaurant header, text-style category
 * tabs, and horizontal product rows (thumbnail on the side, name +
 * description, and either an Options button or a price with a quick "＋").
 * Product details, cart and the hamburger pages (Call Waiter / WiFi / Branch
 * / Rate Us) plus the floating bell are shared with Designs 1 & 2.
 * ------------------------------------------------------------------------ */

/* faint watermark food line-art behind each product row */
const DOODLE = [
  "M4 13h16M4 13a8 8 0 0 1 16 0M6 17h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4Z",
  "M6 8h11a3 3 0 0 1 0 6h-1M6 8v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8M9 3v2M12 3v2M15 3v2",
  "M12 3 3 20l9-3 9 3zM12 9h.01M9.5 14h.01",
];

function RowDoodle({ i }: { i: number }) {
  const d = DOODLE[i % DOODLE.length];
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke={MAROON}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute -bottom-3 end-3 h-24 w-24"
      style={{ opacity: 0.045 }}
    >
      <path d={d} />
    </svg>
  );
}

/* ============================== ROOT ==================================== */

export function MenuDesign3() {
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
      className="fixed inset-0 z-0 mx-auto flex max-w-[480px] flex-col overflow-hidden bg-neutral-50 text-neutral-900 shadow-2xl"
      style={{ fontFamily: MENU_FONT }}
    >
      <div ref={scrollRef} className="scrollbar-none relative flex-1 overflow-y-auto scroll-smooth">
        {view === "home" && (
          <Home3
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

      {/* floating controls — only on the list */}
      {view === "home" && (
        <>
          {/* cart (bottom-start) */}
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

          {/* waiter bell (bottom-end) — shared constant across every design */}
          <button
            onClick={() => setWaiterOpen(true)}
            aria-label={L("نداء النادل", "Call waiter")}
            className="absolute bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-white shadow-xl ring-1 ring-black/5 transition active:scale-95"
            style={{ insetInlineEnd: 18 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/bell.gif" alt="" className="h-10 w-10 object-contain" />
          </button>
        </>
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

function Home3({
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectCat = (i: number) => {
    setCat(i);
    tabRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const ctl = "grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white backdrop-blur-md ring-1 ring-white/15 transition active:scale-95";

  return (
    <div className="min-h-full bg-neutral-50">
      {/* cover banner — real restaurant photo */}
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/restaurants/hero-cover.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.2))" }} />

        {/* top controls */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <button onClick={openSide} aria-label={L("القائمة", "Menu")} className={ctl}><span className="h-5 w-5">{I.menu}</span></button>
            <button onClick={onLang} aria-label={L("اللغة", "Language")} className="grid h-10 w-10 place-items-center rounded-full text-sm font-black text-white shadow-md ring-1 ring-white/25 transition active:scale-95" style={{ background: RED }}>
              {locale === "ar" ? "En" : "ع"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a href={`tel:${RESTAURANT.phone}`} aria-label={L("اتصال", "Call")} className={ctl}><span className="h-5 w-5">{I.phone}</span></a>
            <button aria-label={L("بحث", "Search")} className={ctl}><span className="h-5 w-5">{I.search}</span></button>
          </div>
        </div>
      </div>

      {/* restaurant header */}
      <div className="bg-white px-4 pb-3 pt-4">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1 shadow ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/restaurants/master-chief.png" alt="Master Chief" className="h-full w-full object-contain" />
          </span>
          <h1 className="flex-1 text-xl font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</h1>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
            {L("مفتوح", "open")}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
          <span className="h-3.5 w-3.5 text-rose-500">{I.pin}</span>
          {RESTAURANT.location[locale]}
        </div>
      </div>

      {/* text-style category tabs */}
      <div className="scrollbar-none sticky top-0 z-20 flex gap-1 overflow-x-auto border-b border-neutral-100 bg-white/95 px-3 py-2.5 backdrop-blur">
        {MENU.map((c, i) => {
          const active = i === cat;
          return (
            <button
              key={c.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              onClick={() => selectCat(i)}
              className="shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition"
              style={active ? { background: RED, color: "#fff" } : { color: RED, background: "transparent" }}
            >
              {c.name[locale]}
            </button>
          );
        })}
      </div>

      {/* product rows */}
      <div className="space-y-3 px-3 pb-28 pt-4">
        {category.items.map((it, idx) => {
          const hasOptions = idx % 2 === 0; // alternate options / quick-add like the reference
          return (
            <div
              key={it.id}
              className="relative flex items-stretch gap-3 overflow-hidden rounded-3xl bg-white p-3 shadow-[0_5px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
            >
              <RowDoodle i={idx} />

              {/* thumbnail → details */}
              <button
                onClick={() => openProduct(it)}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
              </button>

              {/* content */}
              <div className="relative flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <button onClick={() => openProduct(it)} className="min-w-0 text-start">
                    <h3 className="truncate text-base font-black">{it.name[locale]}</h3>
                  </button>
                  {!hasOptions && (
                    <span className="whitespace-nowrap text-sm font-black" style={{ color: RED }}>{money(it.price, locale)}</span>
                  )}
                </div>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                  {idx % 3 === 0 && "😋 "}{it.desc[locale]}
                </p>

                <div className="mt-auto flex items-center justify-end gap-2 pt-2">
                  {hasOptions ? (
                    <>
                      <button
                        onClick={() => openProduct(it)}
                        className="rounded-full border px-4 py-1.5 text-xs font-bold transition active:scale-95"
                        style={{ borderColor: RED, color: RED }}
                      >
                        {L("خيارات", "Options")}
                      </button>
                      <button
                        onClick={() => openProduct(it)}
                        aria-label={L("خيارات", "Options")}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-sm transition active:scale-95"
                        style={{ background: RED }}
                      >
                        <span className="h-4 w-4">{I.sliders}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => quickAdd(it)}
                      aria-label={L("أضف إلى السلة", "Add to Cart")}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-sm transition active:scale-95"
                      style={{ background: RED }}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
