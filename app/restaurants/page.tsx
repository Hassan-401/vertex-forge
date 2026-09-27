"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DevCredit } from "@/components/dev-credit";
import { LogoMark } from "@/components/logo";
import { useI18n } from "@/components/providers";
import { WHATSAPP_URL } from "@/lib/site";
import {
  RESTAURANTS_COPY as C,
  DESIGNS,
  BRAND_LOGOS,
  RESTAURANT,
  tl,
} from "@/lib/restaurants";

/* --------------------------------- icons --------------------------------- */

const featureIcons = [
  // QR
  <svg key="qr" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M20 14v.01M14 20v.01M20 20v.01M17 20v.01" /></svg>,
  // palette
  <svg key="palette" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="8.5" cy="10.5" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="15.5" cy="10.5" r="1" /><path d="M12 21a2.5 2.5 0 0 0 0-5 2 2 0 0 1 0-4" /></svg>,
  // edit
  <svg key="edit" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>,
  // clipboard
  <svg key="orders" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /><path d="M9 12h6M9 16h4" /></svg>,
  // chart
  <svg key="chart" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
  // star
  <svg key="star" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.9 6.26L22 9.27l-5 4.87L18.18 21 12 17.56 5.82 21 7 14.14l-5-4.87 7.1-1.01z" /></svg>,
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-bold text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function RestaurantsPage() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="relative">
      <SiteHeader />

      {/* ================================ HERO ============================= */}
      <section className="relative overflow-hidden bg-grid">
        <div className="glow-hero pointer-events-none absolute inset-x-0 -top-40 h-[520px]" />
        <div className="pointer-events-none absolute -top-24 end-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:grid-cols-2">
          <div className="text-center lg:text-start">
            <Eyebrow>{tl(C.hero.badge, locale)}</Eyebrow>
            <h1 className="mt-6 text-3xl font-black leading-[1.2] tracking-tight sm:text-4xl md:text-5xl">
              {tl(C.hero.titleA, locale)}{" "}
              <span className="text-gradient-brand">
                {tl(C.hero.titleHighlight, locale)}
              </span>{" "}
              {tl(C.hero.titleB, locale)}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
              {tl(C.hero.subtitle, locale)}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
              >
                {tl(C.hero.ctaPrimary, locale)}
              </a>
              <a
                href="#designs"
                className="rounded-full border border-border bg-secondary/50 px-8 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
              >
                {tl(C.hero.ctaSecondary, locale)}
              </a>
            </div>
          </div>

          {/* hero mockup */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="animate-float overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10 ring-hair">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/restaurants/hero-dashboard.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -end-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-xl">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary">
                {featureIcons[0]}
              </span>
              <div className="text-start">
                <div className="text-xs font-black">QR</div>
                <div className="text-[10px] text-muted-foreground">
                  {locale === "ar" ? "امسح واطلب" : "Scan & order"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== FEATURES ========================== */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-12 text-center">
          <Eyebrow>{tl(C.features.eyebrow, locale)}</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-black sm:text-4xl">
            {tl(C.features.title, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {tl(C.features.sub, locale)}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {C.features.items.map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-7 ring-hair transition-colors hover:border-primary/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-105">
                {featureIcons[i]}
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{tl(f.title, locale)}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                {tl(f.body, locale)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================== CLIENTS =========================== */}
      <section className="border-y border-border bg-card/40 py-14">
        <div className="mb-8 text-center">
          <Eyebrow>{tl(C.clients.eyebrow, locale)}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-lg text-2xl font-black sm:text-3xl">
            {tl(C.clients.title, locale)}
          </h2>
        </div>
        <div className="mask-fade-x flex overflow-hidden" dir="ltr">
          <div className="flex w-max shrink-0 animate-marquee items-center">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((b, i) => (
              <div
                key={i}
                className="mx-4 flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl border border-border bg-card p-3 ring-hair"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.src}
                  alt={b.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== DESIGNS =========================== */}
      <section id="designs" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-12 text-center">
          <Eyebrow>{tl(C.designs.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            {tl(C.designs.title, locale)}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {tl(C.designs.sub, locale)}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESIGNS.map((d) => (
            <Link
              key={d.id}
              href={`/restaurants/menu/${d.id}`}
              className="group overflow-hidden rounded-3xl border border-border bg-card ring-hair transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={d.thumb}
                  alt={tl(d.name, locale)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-3 end-3 h-6 w-6 rounded-full border-2 border-white/80 shadow"
                  style={{ background: d.accent }}
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <div className="text-base font-extrabold">
                    {tl(d.name, locale)}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {tl(d.style, locale)}
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-transform group-hover:-translate-y-0.5">
                  {tl(C.designs.view, locale)}
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================ FAQ ============================= */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="mb-10 text-center">
          <Eyebrow>{tl(C.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            {tl(C.faq.title, locale)}
          </h2>
        </div>
        <div className="space-y-3">
          {C.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-border bg-card ring-hair"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="font-bold">{tl(item.q, locale)}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-7 text-muted-foreground">
                      {tl(item.a, locale)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="glow-bottom pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow>{tl(C.contact.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {tl(C.contact.title, locale)}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            {tl(C.contact.sub, locale)}
          </p>
          <div className="mt-9">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-primary px-9 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              {tl(C.contact.cta, locale)}
            </a>
          </div>
        </div>
      </section>

      {/* ============================== FOOTER =========================== */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-start">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="h-9" />
              <div>
                <div className="text-base font-extrabold">
                  <span className="text-silver">VERTEX</span>{" "}
                  <span className="text-gradient-brand">FORGE</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.footer.tagline}
                </div>
              </div>
            </Link>
            <div className="text-xs text-muted-foreground">
              {tl(RESTAURANT.tagline, locale)}
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
            <span>{t.footer.rights}</span>
            <DevCredit />
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
