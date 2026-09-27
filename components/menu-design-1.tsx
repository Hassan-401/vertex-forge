"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers";
import { MENU, RESTAURANT, type MenuItem } from "@/lib/restaurants";
import type { Locale } from "@/lib/content";
import {
  MAROON,
  ROSE,
  MENU_FONT,
  money,
  I,
  Logo,
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
 * Menu Design 1 — a full front-end-only ordering mini-app for the demo
 * restaurant. Circular category + product carousels on the home screen, a
 * bell that calls the waiter, product details with sizes & additions, a
 * working cart/order flow, and a menu with WiFi / Branch / Rate Us pages.
 * Shared views (details, cart, side menu, …) live in menu-shared.tsx.
 * ------------------------------------------------------------------------ */

/* ============================== ROOT ==================================== */

export function MenuDesign1() {
  const { locale, toggleLocale } = useI18n();
  const L = (ar: string, en: string) => (locale === "ar" ? ar : en);
  const rtl = locale === "ar";

  const [stack, setStack] = useState<View[]>(["home"]);
  const view = stack[stack.length - 1];
  const nav = (v: View) => setStack((s) => [...s, v]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const goHome = () => setStack(["home"]);

  const [cat, setCat] = useState(1);
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

  // reset scroll on view change
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

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      className="fixed inset-0 z-0 mx-auto flex max-w-[480px] flex-col overflow-hidden bg-white text-neutral-900 shadow-2xl"
      style={{ fontFamily: MENU_FONT }}
    >
      <div ref={scrollRef} className="scrollbar-none relative flex-1 overflow-y-auto scroll-smooth">
        {view === "home" && (
          <HomeView
            L={L}
            locale={locale}
            cat={cat}
            setCat={setCat}
            openProduct={openProduct}
            openCart={() => nav("cart")}
            openSide={() => setSideOpen(true)}
            cartCount={cartCount}
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

      {/* floating waiter bell — only on the main flows */}
      {(view === "home" || view === "product" || view === "cart") && (
        <button
          onClick={() => setWaiterOpen(true)}
          aria-label={L("نداء النادل", "Call waiter")}
          className="absolute bottom-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-white shadow-xl ring-1 ring-black/5 transition active:scale-95"
          style={{ insetInlineEnd: 18 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/restaurants/bell.gif" alt="" className="h-11 w-11 object-contain" />
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

/* ------------------------------ top bar ---------------------------------- */

function TopBar({
  L,
  locale,
  onCart,
  onMenu,
  cartCount,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  onCart: () => void;
  onMenu: () => void;
  cartCount: number;
}) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between gap-2 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2.5">
        <Logo />
        <div className="leading-tight">
          <div className="text-[15px] font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-neutral-500">
            <span className="h-3 w-3 text-rose-500">{I.pin}</span>
            {RESTAURANT.location[locale]}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-neutral-700">
        <button className="grid h-9 w-9 place-items-center"><span className="h-5 w-5">{I.search}</span></button>
        <button onClick={onCart} className="relative grid h-9 w-9 place-items-center">
          <span className="h-5 w-5">{I.bag}</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white">{cartCount}</span>
          )}
        </button>
        <button onClick={onMenu} aria-label={L("القائمة", "Menu")} className="grid h-9 w-9 place-items-center"><span className="h-5 w-5">{I.menu}</span></button>
      </div>
    </div>
  );
}

/* ================================ HOME =================================== */

/* faint outline food doodles scattered behind the hero headline */
const DOODLE = {
  burger: "M4 13h16M4 13a8 8 0 0 1 16 0M6 17h12a2 2 0 0 0 0-4H6a2 2 0 0 0 0 4Zm1-8.5h.01M10 7h.01M13 7.5h.01M16 8h.01",
  cup: "M6 8h11a3 3 0 0 1 0 6h-1M6 8v9a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V8M9 3v2M12 3v2M15 3v2",
  pizza: "M12 3 3 20l9-3 9 3zM12 9h.01M9.5 14h.01M14.5 14h.01",
  fork: "M7 3v7a2 2 0 0 0 2 2h0v9M9 3v5M5 3v5M17 3c-1.5 0-2 2-2 5s.5 4 2 4v9",
  drink: "M6 4h12l-1.5 9a3 3 0 0 1-3 2.5h-3A3 3 0 0 1 7.5 13L6 4ZM6 4l-.5-2M8 8h8",
};

function HeroDoodles() {
  const items = [
    { d: DOODLE.burger, style: { top: "18%", insetInlineStart: "6%", width: 46, transform: "rotate(-8deg)" } },
    { d: DOODLE.cup, style: { top: "8%", insetInlineEnd: "10%", width: 34, transform: "rotate(10deg)" } },
    { d: DOODLE.pizza, style: { top: "54%", insetInlineStart: "22%", width: 40, transform: "rotate(6deg)" } },
    { d: DOODLE.drink, style: { top: "48%", insetInlineEnd: "8%", width: 30, transform: "rotate(-12deg)" } },
    { d: DOODLE.fork, style: { top: "62%", insetInlineEnd: "34%", width: 26, transform: "rotate(14deg)" } },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="none" stroke={MAROON} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="absolute" style={{ opacity: 0.07, ...it.style }}>
          <path d={it.d} />
        </svg>
      ))}
    </div>
  );
}

function HomeView({
  L,
  locale,
  cat,
  setCat,
  openProduct,
  openCart,
  openSide,
  cartCount,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  cat: number;
  setCat: (n: number) => void;
  openProduct: (it: MenuItem) => void;
  openCart: () => void;
  openSide: () => void;
  cartCount: number;
}) {
  const category = MENU[cat];

  return (
    <div className="flex min-h-full flex-col bg-white">
      <TopBar L={L} locale={locale} onCart={openCart} onMenu={openSide} cartCount={cartCount} />

      {/* hero headline over faint food doodles */}
      <div className="relative overflow-hidden">
        <HeroDoodles />
        <p className="relative px-5 pb-5 pt-4 text-[19px] font-extrabold leading-8 text-neutral-800">
          {L("نكهات فريدة… تجربة طعم لا تُنسى", "Unique flavors… an unforgettable taste experience")} 😍✨
        </p>
      </div>

      {/* layered curved domes fill the rest of the screen (no empty space) */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* dome backdrops: maroon crown, then rose filling to the bottom
            with a convex arch rising into the maroon */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[430px] w-[152%] -translate-x-1/2 rounded-[50%]" style={{ background: MAROON }} />
          <div className="absolute inset-x-0 bottom-0 top-[250px]" style={{ background: ROSE }} />
          <div className="absolute left-1/2 top-[196px] h-[420px] w-[176%] -translate-x-1/2 rounded-[50%]" style={{ background: ROSE }} />
        </div>

        <div className="relative flex flex-1 flex-col pb-6">
          {/* handle at the dome crown */}
          <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-amber-400" />

          {/* curved category carousel on the maroon dome */}
          <CategoryCarousel locale={locale} cat={cat} setCat={setCat} />

          {/* large curved product showcase, vertically centred in the rose */}
          <div className="flex flex-1 flex-col justify-center">
            <ShowcaseCarousel items={category.items} locale={locale} onPick={openProduct} catKey={cat} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* categories laid along the maroon dome's arc — same curved scroll as the
 * products; the card nearest the centre becomes the active category. */
function CategoryCarousel({
  locale,
  cat,
  setCat,
}: {
  locale: Locale;
  cat: number;
  setCat: (n: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const raf = useRef(0);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockUntil = useRef(0); // suppress auto-select during a programmatic scroll

  const paint = () => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    const half = rect.width / 2 || 1;
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const norm = (c - mid) / half;
      const ad = Math.min(Math.abs(norm), 1.8);
      const scale = Math.max(0.6, 1 - 0.24 * ad);
      const ty = 32 * ad * ad; // dip down along the dome arc
      const opacity = Math.max(0.5, 1 - 0.32 * ad);
      el.style.transform = `translateY(${ty}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(20 - Math.round(ad * 10));
    });
  };

  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return cat;
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    let best = cat;
    let bestD = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  };

  const centerTo = (i: number, smooth = true) => {
    lockUntil.current = Date.now() + 600;
    cardRefs.current[i]?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", inline: "center", block: "nearest" });
  };

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(paint);
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      if (Date.now() < lockUntil.current) return;
      const n = nearestIndex();
      if (n !== cat) setCat(n);
    }, 130);
  };

  useEffect(() => {
    centerTo(cat, false);
    paint();
    const t = setTimeout(paint, 80);
    window.addEventListener("resize", paint);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", paint);
      cancelAnimationFrame(raf.current);
      if (settle.current) clearTimeout(settle.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={trackRef} onScroll={onScroll} className="scrollbar-none mt-5 flex snap-x snap-mandatory overflow-x-auto pb-1">
      <div className="shrink-0" style={{ width: "34%" }} aria-hidden />
      {MENU.map((c, i) => {
        const active = i === cat;
        return (
          <button
            key={c.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            onClick={() => { setCat(i); centerTo(i); }}
            className="flex shrink-0 snap-center flex-col items-center gap-2 pt-1 [will-change:transform]"
            style={{ width: "32%", transformOrigin: "center center", transitionProperty: "opacity", transitionDuration: "150ms" }}
          >
            <span className={`overflow-hidden rounded-full ${active ? "ring-[5px] ring-white/70" : "ring-2 ring-white/20"}`} style={{ width: 88, height: 88, background: "rgba(255,255,255,0.14)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="line-clamp-2 max-w-[100px] text-center text-[11px] font-bold uppercase leading-tight tracking-wide text-white">{c.name[locale]}</span>
          </button>
        );
      })}
      <div className="shrink-0" style={{ width: "34%" }} aria-hidden />
    </div>
  );
}

/* products laid out along the rose dome's arc: the centred card is high &
 * large, neighbours dip down and shrink as they ride the curve outward. */
function ShowcaseCarousel({
  items,
  locale,
  onPick,
  catKey,
}: {
  items: MenuItem[];
  locale: Locale;
  onPick: (it: MenuItem) => void;
  catKey: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const raf = useRef(0);

  const paint = () => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const mid = rect.left + rect.width / 2;
    const half = rect.width / 2 || 1;
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const norm = (c - mid) / half; // ~±1.1 for an immediate neighbour
      const ad = Math.min(Math.abs(norm), 1.6);
      const scale = Math.max(0.58, 1 - 0.3 * ad);
      const ty = 30 * ad * ad; // parabola → dip down along the arc
      const opacity = Math.max(0.5, 1 - 0.34 * ad);
      el.style.transform = `translateY(${ty}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(20 - Math.round(ad * 10));
    });
  };

  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(paint);
  };

  // repaint on mount, on category change (items swap → scroll resets), on resize
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    paint();
    const t1 = setTimeout(paint, 60);
    const t2 = setTimeout(paint, 220);
    window.addEventListener("resize", paint);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", paint);
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catKey]);

  return (
    <div
      ref={trackRef}
      onScroll={onScroll}
      className="scrollbar-none mt-7 flex snap-x snap-mandatory overflow-x-auto pb-4 pt-1"
    >
      {/* leading spacer so the first card can sit dead-centre */}
      <div className="shrink-0" style={{ width: "23%" }} aria-hidden />
      {items.map((it, i) => (
        <div key={it.id} className="flex shrink-0 snap-center justify-center px-1" style={{ width: "54%" }}>
          <button
            ref={(el) => { cardRefs.current[i] = el; }}
            onClick={() => onPick(it)}
            className="flex w-full flex-col items-center [will-change:transform]"
            style={{ transformOrigin: "center center", transitionProperty: "opacity", transitionDuration: "150ms" }}
          >
            <span
              className="grid aspect-square w-full place-items-center rounded-full"
              style={{ background: "rgba(255,255,255,0.16)", boxShadow: "inset 0 2px 20px rgba(255,255,255,0.22)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.image} alt="" className="h-[80%] w-[80%] object-contain drop-shadow-[0_18px_24px_rgba(0,0,0,0.34)]" />
            </span>
            <span className="mt-4 text-center text-lg font-black leading-tight text-white">{it.name[locale]}</span>
            <span className="mt-1 text-sm font-bold text-white/95">{money(it.price, locale)}</span>
          </button>
        </div>
      ))}
      <div className="shrink-0" style={{ width: "23%" }} aria-hidden />
    </div>
  );
}
