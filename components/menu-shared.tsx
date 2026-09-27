"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { RESTAURANT, type MenuItem } from "@/lib/restaurants";
import type { Locale } from "@/lib/content";

/* --------------------------------------------------------------------------
 * Shared building blocks for the Master Chief e-menu designs. Every design
 * (menu-design-1, menu-design-2, …) reuses these: the palette, the product
 * details page, cart, and the hamburger "menu" pages (Call Waiter, WiFi,
 * Branch Details, Rate Us). Only each design's home/list layout differs.
 * No backend — cart and forms live in component state only.
 * ------------------------------------------------------------------------ */

export const RED = "#a01722";
export const MAROON = "#6f1420";
export const ROSE = "#c06a6a";

// rounded geometric sans for the menus: Poppins for Latin, Cairo for Arabic.
export const MENU_FONT = "var(--font-poppins), var(--font-cairo), system-ui, sans-serif";

export type View = "home" | "product" | "cart" | "wifi" | "branch" | "rate";

export type CartLine = {
  uid: string;
  item: MenuItem;
  size: string;
  sizePrice: number;
  additions: { id: string; name: string; price: number }[];
  qty: number;
};

export const SIZES = [
  { key: "small", ar: "صغير", en: "Small", mult: 1 },
  { key: "medium", ar: "وسط", en: "Medium", mult: 1.18 },
  { key: "large", ar: "كبير", en: "Large", mult: 1.4 },
];

export const ADDITIONS = [
  { id: "tomato", ar: "طماطم", en: "Tomato", price: 10, emoji: "🍅" },
  { id: "lettuce", ar: "خس", en: "Lettuce", price: 15, emoji: "🥬" },
  { id: "onion", ar: "بصل", en: "Onion", price: 10, emoji: "🧅" },
  { id: "cheese", ar: "جبنة", en: "Cheese", price: 20, emoji: "🧀" },
];

export const HOURS = [
  { ar: "السبت", en: "Saturday", h: "10:00 AM - 1:00 AM" },
  { ar: "الأحد", en: "Sunday", h: "9:00 AM - 1:00 AM" },
  { ar: "الاثنين", en: "Monday", h: "9:00 AM - 1:00 AM" },
  { ar: "الثلاثاء", en: "Tuesday", h: "9:00 AM - 1:00 AM" },
  { ar: "الأربعاء", en: "Wednesday", h: "9:00 AM - 1:00 AM" },
  { ar: "الخميس", en: "Thursday", h: "9:00 AM - 1:00 AM" },
  { ar: "الجمعة", en: "Friday", h: "9:00 AM - 1:00 AM" },
];
const TODAY = new Date().getDay(); // 0 = Sunday → maps to HOURS index 1
export const TODAY_IDX = (TODAY + 1) % 7;

export const money = (n: number, locale: Locale) =>
  `${n.toFixed(2)} ${RESTAURANT.currency[locale]}`;

export const sizePriceOf = (item: MenuItem, key: string) =>
  Math.round(item.price * (SIZES.find((s) => s.key === key)?.mult ?? 1));

/* ------------------------------- icons ----------------------------------- */
export const I = {
  search: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>,
  bag: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  cart: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1.6" /><circle cx="18" cy="21" r="1.6" /><path d="M2.5 3h2.2l2 12.5a1.6 1.6 0 0 0 1.6 1.3h8.9a1.6 1.6 0 0 0 1.6-1.3L21 7H6" /></svg>,
  menu: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>,
  sliders: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h11M4 12h7M4 18h13" /><circle cx="18" cy="6" r="2" /><circle cx="14" cy="12" r="2" /><circle cx="19" cy="18" r="2" /></svg>,
  back: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>,
  home: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8" /><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" /></svg>,
  bell: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
  pin: <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" /></svg>,
  wifi: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.1a6 6 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" /><circle cx="12" cy="20" r="0.5" fill="currentColor" /></svg>,
  globe: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>,
  info: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>,
  star: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.56 5.82 21 7 14.14l-5-4.87 7.1-1.01z" /></svg>,
  phone: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>,
  doc: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>,
  clock: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  nav: <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor"><path d="M12 2 2 12l4 1 1 4 3-6 6-3z" /></svg>,
  chevron: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>,
  copy: <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>,
};

/* -------------------------- shared little bits --------------------------- */

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-black text-white"
      style={{ width: size, height: size, background: RED, fontSize: size * 0.32 }}
    >
      MC
    </span>
  );
}

export function Toast({ msg }: { msg: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-28 z-[60] flex justify-center px-6">
      <div className="rounded-full bg-neutral-900/90 px-5 py-2.5 text-sm font-bold text-white shadow-xl">
        {msg}
      </div>
    </div>
  );
}

/* ============================== PRODUCT ================================== */

export function DetailBar({ L, title, onBack, onHome, onCart, cartCount }: { L: (a: string, e: string) => string; title: string; onBack: () => void; onHome: () => void; onCart: () => void; cartCount: number; }) {
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-white/95 px-4 py-3 backdrop-blur">
      <button onClick={onBack} aria-label={L("رجوع", "Back")} className="grid h-9 w-9 place-items-center"><span className="h-5 w-5 rtl:rotate-180">{I.back}</span></button>
      <div className="text-base font-black">{title}</div>
      <div className="flex items-center gap-1">
        <button onClick={onHome} className="grid h-9 w-9 place-items-center" style={{ color: RED }}><span className="h-5 w-5">{I.home}</span></button>
        <button onClick={onCart} className="relative grid h-9 w-9 place-items-center">
          <span className="h-5 w-5">{I.bag}</span>
          {cartCount > 0 && <span className="absolute -top-0.5 end-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white">{cartCount}</span>}
        </button>
      </div>
    </div>
  );
}

export function ProductView({
  L,
  locale,
  item,
  onBack,
  onHome,
  openCart,
  cartCount,
  add,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  item: MenuItem;
  onBack: () => void;
  onHome: () => void;
  openCart: () => void;
  cartCount: number;
  add: (l: Omit<CartLine, "uid">) => void;
}) {
  const [size, setSize] = useState("small");
  const [adds, setAdds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const sizePrice = (k: string) => sizePriceOf(item, k);
  const chosenAdds = ADDITIONS.filter((a) => adds.includes(a.id)).map((a) => ({ id: a.id, name: a[locale], price: a.price }));
  const unit = sizePrice(size) + chosenAdds.reduce((s, a) => s + a.price, 0);

  return (
    <div className="pb-28">
      <DetailBar L={L} title={L("التفاصيل", "Details")} onBack={onBack} onHome={onHome} onCart={openCart} cartCount={cartCount} />

      <div className="grid aspect-square w-full place-items-center px-8 pt-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" className="max-h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]" />
      </div>

      <div className="px-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-black">{item.name[locale]}</h1>
          <span className="whitespace-nowrap text-xl font-black" style={{ color: RED }}>{money(sizePrice(size), locale)}</span>
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm">
          {item.kcal && <span className="flex items-center gap-1 font-bold text-amber-600">🔥 {item.kcal} kcal</span>}
          <span className="text-base">🌿</span>
          {item.tags?.includes("spicy") && <span className="text-base">🌶️</span>}
          <span className="text-base">⚠️</span>
        </div>

        <p className="mt-3 text-sm leading-6 text-neutral-500">{item.desc[locale]}</p>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-neutral-100 px-4 py-3 text-xs text-rose-700">
          <span className="h-4 w-4 shrink-0" style={{ color: RED }}>{I.bell}</span>
          {L("تُضاف رسوم خدمة 12٪ وضريبة 14٪.", "A 12% service charge and a 14% tax are added.")}
        </div>

        {/* sizes */}
        <div className="mt-6 flex items-center gap-2 font-black" style={{ color: RED }}>
          <span>☕</span> {L("الحجم", "Size")}
        </div>
        <div className="mt-3 flex justify-between gap-3">
          {SIZES.map((s) => {
            const active = s.key === size;
            return (
              <button key={s.key} onClick={() => setSize(s.key)} className="flex flex-1 flex-col items-center gap-1.5">
                <span className={`grid aspect-square w-full max-w-24 place-items-center overflow-hidden rounded-full border-2 transition ${active ? "" : "border-neutral-200"}`} style={active ? { borderColor: RED, boxShadow: `0 0 0 4px ${RED}22` } : {}}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="text-sm font-bold">{s[locale]}</span>
                <span className="text-xs text-neutral-500">{money(sizePrice(s.key), locale)}</span>
              </button>
            );
          })}
        </div>

        {/* additions */}
        <div className="mt-7 flex items-center gap-2 font-black" style={{ color: RED }}>
          <span>➕</span> {L("الإضافات", "Additions")}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {ADDITIONS.map((a) => {
            const on = adds.includes(a.id);
            return (
              <button key={a.id} onClick={() => setAdds((v) => (on ? v.filter((x) => x !== a.id) : [...v, a.id]))} className="relative rounded-2xl bg-rose-50 p-3 text-start ring-1 ring-black/5">
                <span className="mb-6 grid h-12 w-full place-items-center text-3xl">{a.emoji}</span>
                <span className="block text-sm font-bold">{a[locale]}</span>
                <span className="mt-0.5 block text-xs text-neutral-500">{money(a.price, locale)}</span>
                <span className={`absolute bottom-3 end-3 grid h-5 w-5 place-items-center rounded-md border-2 ${on ? "text-white" : "border-neutral-300"}`} style={on ? { background: RED, borderColor: RED } : {}}>
                  {on && <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-w-[480px] items-center gap-3 border-t border-neutral-200 bg-white p-3">
        <div className="flex items-center gap-3 rounded-full bg-neutral-100 px-2 py-1.5">
          <button onClick={() => setQty((q) => q + 1)} className="grid h-8 w-8 place-items-center rounded-full text-white" style={{ background: RED }}>+</button>
          <span className="min-w-4 text-center font-black">{qty}</span>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-8 w-8 place-items-center rounded-full text-white" style={{ background: RED }}>−</button>
        </div>
        <button
          onClick={() => add({ item, size: L(SIZES.find((s) => s.key === size)!.ar, SIZES.find((s) => s.key === size)!.en), sizePrice: sizePrice(size), additions: chosenAdds, qty })}
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black text-white"
          style={{ background: RED }}
        >
          {L("أضف إلى السلة", "Add to Cart")} · {money(unit * qty, locale)}
        </button>
      </div>
    </div>
  );
}

/* ================================ CART ================================== */

export function CartView({
  L,
  locale,
  cart,
  setCart,
  total,
  onBack,
  onHome,
  onOrder,
}: {
  L: (a: string, e: string) => string;
  locale: Locale;
  cart: CartLine[];
  setCart: Dispatch<SetStateAction<CartLine[]>>;
  total: number;
  onBack: () => void;
  onHome: () => void;
  onOrder: () => void;
}) {
  const setQty = (uid: string, d: number) =>
    setCart((c) => c.map((l) => (l.uid === uid ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
  const remove = (uid: string) => setCart((c) => c.filter((l) => l.uid !== uid));

  return (
    <div className="min-h-full pb-28">
      <DetailBar L={L} title={L("سلة الطلب", "Your Order")} onBack={onBack} onHome={onHome} onCart={() => {}} cartCount={cart.reduce((s, l) => s + l.qty, 0)} />

      {cart.length === 0 ? (
        <div className="grid place-items-center px-6 py-24 text-center">
          <div className="text-6xl">🛒</div>
          <p className="mt-4 font-bold text-neutral-500">{L("سلتك فارغة", "Your cart is empty")}</p>
          <button onClick={onHome} className="mt-5 rounded-full px-6 py-2.5 text-sm font-bold text-white" style={{ background: RED }}>
            {L("تصفح المنيو", "Browse the menu")}
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3 p-4">
            {cart.map((l) => {
              const line = (l.sizePrice + l.additions.reduce((a, x) => a + x.price, 0)) * l.qty;
              return (
                <div key={l.uid} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                  <span className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.item.image} alt="" className="h-full w-full object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate font-bold">{l.item.name[locale]}</span>
                      <button onClick={() => remove(l.uid)} className="text-neutral-400 hover:text-rose-600">✕</button>
                    </div>
                    <div className="mt-0.5 text-xs text-neutral-500">
                      {l.size}
                      {l.additions.length > 0 && ` · ${l.additions.map((a) => a.name).join("، ")}`}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-neutral-100 px-1.5 py-1">
                        <button onClick={() => setQty(l.uid, 1)} className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: RED }}>+</button>
                        <span className="min-w-3 text-center text-sm font-bold">{l.qty}</span>
                        <button onClick={() => setQty(l.uid, -1)} className="grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: RED }}>−</button>
                      </div>
                      <span className="font-black" style={{ color: RED }}>{money(line, locale)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] border-t border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between font-black">
              <span>{L("الإجمالي", "Total")}</span>
              <span style={{ color: RED }}>{money(total, locale)}</span>
            </div>
            <button onClick={onOrder} className="w-full rounded-full py-3.5 text-sm font-black text-white" style={{ background: RED }}>
              {L("تأكيد الطلب", "Place Order")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================ SIDE MENU ================================= */

export function SideMenu({
  L,
  onClose,
  onWaiter,
  onWifi,
  onLang,
  onBranch,
  onRate,
}: {
  L: (a: string, e: string) => string;
  onClose: () => void;
  onWaiter: () => void;
  onWifi: () => void;
  onLang: () => void;
  onBranch: () => void;
  onRate: () => void;
}) {
  const rows = [
    { icon: I.bell, label: L("نداء النادل", "Call Waiter"), on: onWaiter },
    { icon: I.wifi, label: L("الاتصال بالواي فاي", "Connect to WiFi"), on: onWifi },
    { icon: I.globe, label: L("اللغة", "Language"), on: onLang },
    { icon: I.info, label: L("بيانات الفرع", "Branch Details"), on: onBranch },
    { icon: I.star, label: L("قيّمنا", "Rate Us"), on: onRate },
  ];
  return (
    <div
      className="absolute inset-0 z-50 grid place-items-center px-6"
      style={{ background: "linear-gradient(160deg, #4a0e17 0%, #2c0810 100%)" }}
      onClick={onClose}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-3.5">
          {rows.map((r, i) => (
            <button key={i} onClick={r.on} className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-start font-bold text-white shadow-lg transition active:scale-[0.98] hover:bg-white/15">
              <span className="h-5 w-5 text-amber-300">{r.icon}</span>
              <span className="flex-1">{r.label}</span>
              <span className="h-4 w-4 opacity-70 rtl:rotate-180">{I.chevron}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mx-auto mt-6 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white shadow-lg ring-1 ring-white/20 transition active:scale-95">✕</button>
      </div>
    </div>
  );
}

/* =========================== WAITER SHEET =============================== */

export function WaiterSheet({ L, onClose, setToast }: { L: (a: string, e: string) => string; onClose: () => void; setToast: (s: string) => void; }) {
  const [table, setTable] = useState("1");
  return (
    <div className="absolute inset-0 z-50 flex items-end bg-black/50" onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white p-5 pb-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-neutral-300" />
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-100 text-2xl">🛎️</span>
            <div>
              <div className="text-lg font-black">{L("نداء النادل", "Call Waiter")}</div>
              <div className="text-xs text-neutral-500">{L("اطلب الخدمة على طاولتك", "Request service at your table")}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400">✕</button>
        </div>

        <label className="mt-5 block text-sm font-bold">{L("اختر رقم طاولتك", "Select your table number")}</label>
        <div className="relative mt-2">
          <select value={table} onChange={(e) => setTable(e.target.value)} className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-bold outline-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <option key={i} value={String(i + 1)}>{L(`طاولة ${i + 1}`, `Table ${i + 1}`)}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 end-3 grid place-items-center text-neutral-400"><span className="h-4 w-4 rotate-90">{I.chevron}</span></span>
        </div>

        <button
          onClick={() => { onClose(); setToast(L(`تم استدعاء النادل إلى الطاولة ${table} 🛎️`, `Waiter called to table ${table} 🛎️`)); }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black text-white"
          style={{ background: RED }}
        >
          <span className="h-4 w-4">{I.bell}</span> {L("اطلب الآن", "Call Now")}
        </button>
      </div>
    </div>
  );
}

/* =============================== WIFI =================================== */

export function WifiView({ L, onBack, onHome, setToast }: { L: (a: string, e: string) => string; onBack: () => void; onHome: () => void; setToast: (s: string) => void; }) {
  const pass = "123456";
  const steps = [
    L("افتح إعدادات الواي فاي على جهازك", "Go to your device's WiFi settings"),
    L("اختر Free Wifi من القائمة", "Select Free Wifi from the list"),
    L("أدخل كلمة المرور عند طلبها", "Enter the password when prompted"),
  ];
  return (
    <div className="min-h-full bg-neutral-50 pb-10">
      <DetailBar L={L} title={L("الواي فاي", "WiFi")} onBack={onBack} onHome={onHome} onCart={() => {}} cartCount={0} />
      <div className="p-5">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="grid place-items-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: RED }}><span className="h-7 w-7">{I.wifi}</span></span>
            <h2 className="mt-3 text-lg font-black">{L("الاتصال بالواي فاي", "Connect to WiFi")}</h2>
            <p className="text-xs text-neutral-500">{L("بيانات شبكتنا موضّحة بالأسفل", "Here are the WiFi credentials for our network")}</p>
          </div>

          <label className="mt-5 block text-sm font-bold">{L("اسم الشبكة", "Network Name")}</label>
          <div className="mt-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-bold">Free Wifi</div>

          <label className="mt-4 block text-sm font-bold">{L("كلمة المرور", "Password")}</label>
          <div className="mt-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-bold">{pass}</div>

          <button
            onClick={() => { navigator.clipboard?.writeText(pass).catch(() => {}); setToast(L("تم نسخ كلمة المرور", "Password copied")); }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-100 py-3 text-sm font-bold"
          >
            <span className="h-4 w-4">{I.copy}</span> {L("نسخ كلمة المرور", "Copy Password")}
          </button>

          <ol className="mt-5 space-y-2.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-neutral-600">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black text-white" style={{ background: RED }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>

          <button onClick={onBack} className="mt-6 w-full rounded-full py-3.5 text-sm font-black text-white" style={{ background: RED }}>{L("تم", "Done")}</button>
        </div>
      </div>
    </div>
  );
}

/* ============================= BRANCH =================================== */

export function BranchView({ L, locale, onBack, onHome, openRate }: { L: (a: string, e: string) => string; locale: Locale; onBack: () => void; onHome: () => void; openRate: () => void; }) {
  const rows = [
    { icon: I.phone, label: L("الهاتف", "Phone"), value: "01285644414", trail: I.chevron },
    { icon: I.pin, label: L("العنوان", "Address"), value: RESTAURANT.location[locale], trail: <span style={{ color: RED }}>{I.nav}</span> },
    { icon: I.doc, label: L("الشروط والأحكام", "Terms & Conditions"), value: L("عرض الشروط والأحكام", "View terms and conditions"), trail: I.chevron },
    { icon: I.star, label: L("قيّمنا", "Rate Us"), value: L("قيّمنا لتحسين خدمتنا", "Rate Us to improve our service"), trail: I.chevron, on: openRate },
    { icon: I.info, label: L("عن الفرع", "About Branch"), value: L("اعرف المزيد عنا", "Learn more about us"), trail: I.chevron },
  ];
  return (
    <div className="min-h-full bg-neutral-50 pb-10">
      <DetailBar L={L} title={L("بيانات الفرع", "Branch Details")} onBack={onBack} onHome={onHome} onCart={() => {}} cartCount={0} />
      <div className="p-4">
        <div className="mb-4 flex items-center gap-3">
          <Logo size={48} />
          <div className="text-xl font-black">{locale === "ar" ? RESTAURANT.nameAr : RESTAURANT.name}</div>
        </div>

        <div className="space-y-3">
          {rows.map((r, i) => (
            <button key={i} onClick={r.on} className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-start shadow-sm ring-1 ring-black/5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-100" style={{ color: RED }}><span className="h-5 w-5">{r.icon}</span></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-neutral-400">{r.label}</span>
                <span className="block truncate font-bold">{r.value}</span>
              </span>
              <span className="h-5 w-5 shrink-0 text-neutral-400 rtl:rotate-180">{r.trail}</span>
            </button>
          ))}

          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-100" style={{ color: RED }}><span className="h-5 w-5">{I.clock}</span></span>
              <span className="font-black">{L("ساعات العمل", "Working Hours")}</span>
            </div>
            <ul className="text-sm">
              {HOURS.map((d, i) => {
                const today = i === TODAY_IDX;
                return (
                  <li key={i} className="flex items-center justify-between py-1.5" style={today ? { color: RED, fontWeight: 800 } : { color: "#525252" }}>
                    <span>{d[locale]}</span>
                    <span dir="ltr">{d.h}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================== RATE =================================== */

function Stars({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n)} className="h-7 w-7" style={{ color: n <= value ? "#f59e0b" : "#d4d4d4" }}>
          <svg viewBox="0 0 24 24" className="h-full w-full" fill={n <= value ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 3l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.56 5.82 21 7 14.14l-5-4.87 7.1-1.01z" /></svg>
        </button>
      ))}
    </div>
  );
}

function Emojis({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const faces = ["😡", "🙁", "😐", "😊", "😍"];
  return (
    <div className="flex justify-between gap-1 px-1">
      {faces.map((f, i) => (
        <button key={i} onClick={() => onChange(i + 1)} className={`text-2xl transition ${value === i + 1 ? "scale-125" : "opacity-60"}`}>{f}</button>
      ))}
    </div>
  );
}

export function RateView({ L, onBack, onHome, setToast }: { L: (a: string, e: string) => string; onBack: () => void; onHome: () => void; setToast: (s: string) => void; }) {
  const [q, setQ] = useState({ food: 0, speed: 0, staff: 0, clean: 0, repeat: 0 });
  const set = (k: keyof typeof q) => (n: number) => setQ((v) => ({ ...v, [k]: n }));
  const starRows = [
    { k: "food" as const, label: L("جودة الطعام", "Food Quality") },
    { k: "speed" as const, label: L("سرعة الخدمة", "Speed Of Service") },
    { k: "staff" as const, label: L("تعامل الموظفين", "Staff Attitude") },
  ];
  const emojiRows = [
    { k: "clean" as const, label: L("النظافة", "Cleanliness") },
    { k: "repeat" as const, label: L("هل ستكرّر الزيارة؟", "Will You Repeat the Visit?") },
  ];
  return (
    <div className="min-h-full bg-neutral-50 pb-28">
      {/* red header */}
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: MAROON }}>
        <button onClick={onBack} className="grid h-9 w-9 place-items-center"><span className="h-5 w-5 rtl:rotate-180">{I.back}</span></button>
        <div className="text-center leading-tight">
          <div className="text-[10px] font-bold tracking-widest opacity-80">{L("الخط الساخن", "HOT LINE")}</div>
          <div className="text-base font-black">01285644414</div>
        </div>
        <button onClick={onHome} className="grid h-9 w-9 place-items-center"><span className="h-5 w-5">{I.home}</span></button>
      </div>

      <div className="p-4">
        <div className="rounded-2xl p-5 text-center text-white" style={{ background: MAROON }}>
          <div className="text-xl font-black">{L("رأيك يهمنا", "Your Opinion Matters")}</div>
          <div className="mt-1 text-xs opacity-90">{L("آراؤكم مصدر إلهامنا. شاركنا تجربتك.", "your opinions are our inspiration. Share your experience.")}</div>
        </div>

        {/* contact */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-3 font-black">{L("بيانات التواصل", "Contact Info")}</div>
          <label className="block text-sm font-bold">{L("الاسم", "Name")}</label>
          <input className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none" placeholder={L("أدخل اسمك", "Enter your name")} />
          <label className="mt-3 block text-sm font-bold"><span className="text-rose-600">*</span> {L("رقم الهاتف", "Phone Number")}</label>
          <input inputMode="tel" className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none" placeholder={L("أدخل رقم هاتفك", "Enter your phone")} />
        </div>

        {/* evaluation */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-3 font-black">{L("تقييم الخدمة", "Service Evaluation")}</div>
          <div className="space-y-3">
            {starRows.map((r, idx) => (
              <div key={r.k} className="rounded-xl bg-neutral-50 p-3 ring-1 ring-black/5">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black text-white" style={{ background: RED }}>{idx + 1}</span>
                  {r.label}
                </div>
                <Stars value={q[r.k]} onChange={set(r.k)} />
              </div>
            ))}
            {emojiRows.map((r, idx) => (
              <div key={r.k} className="rounded-xl bg-neutral-50 p-3 ring-1 ring-black/5">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black text-white" style={{ background: RED }}>{idx + 4}</span>
                  {r.label}
                </div>
                <Emojis value={q[r.k]} onChange={set(r.k)} />
              </div>
            ))}
          </div>
        </div>

        {/* comment */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-2 font-black">{L("أضف تعليقك", "Add Your Comment")}</div>
          <label className="block text-sm font-bold">{L("ملاحظات", "Notes")}</label>
          <textarea rows={3} className="mt-1.5 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none" placeholder={L("ملاحظات (اختياري)", "Notes (Optional)")} />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[480px] border-t border-neutral-200 bg-white p-4">
        <button onClick={() => { setToast(L("شكرًا لتقييمك! ⭐", "Thanks for your feedback! ⭐")); onHome(); }} className="w-full rounded-full py-3.5 text-sm font-black text-white" style={{ background: RED }}>
          {L("إرسال", "Submit")}
        </button>
      </div>
    </div>
  );
}
