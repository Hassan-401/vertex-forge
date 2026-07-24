"use client";

import { SiteHeader } from "@/components/site-header";
import { Portfolio } from "@/components/portfolio";
import { Faq } from "@/components/faq";
import { Testimonials } from "@/components/testimonials";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DevCredit } from "@/components/dev-credit";
import { LogoMark } from "@/components/logo";
import { useI18n } from "@/components/providers";

/* -------------------------------- helpers -------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-bold text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-primary">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01z" />
        </svg>
      ))}
    </div>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3 fill-none stroke-current"
        strokeWidth="3"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ---------------------------------- page --------------------------------- */

export default function Home() {
  const { t } = useI18n();

  return (
    <div id="top" className="relative">
      <SiteHeader />

      {/* ================================ HERO ============================== */}
      <section className="relative overflow-hidden bg-grid">
        <div className="glow-hero pointer-events-none absolute inset-x-0 -top-40 h-[520px]" />
        <div className="pointer-events-none absolute -top-24 end-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-36 text-center sm:px-6 md:pt-44">
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            {t.hero.titleA}{" "}
            <span className="text-gradient-brand">{t.hero.titleHighlight}</span>
            <br className="hidden sm:block" /> {t.hero.titleB}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#work"
              className="rounded-full border border-border bg-secondary/50 px-8 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <Stars />
            <span>{t.hero.trust}</span>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
            {t.stats.map((s) => (
              <div key={s.label} className="bg-card px-6 py-8 text-center">
                <div className="text-3xl font-black text-gradient-brand md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== SERVICES ============================ */}
      <section id="services" className="border-y border-border py-8">
        <div className="mask-fade-x flex overflow-hidden" dir="ltr">
          <div className="flex w-max shrink-0 animate-marquee items-center">
            {[...t.services, ...t.services].map((s, i) => (
              <span
                key={i}
                className="mx-8 flex items-center gap-3 whitespace-nowrap text-lg font-bold text-muted-foreground"
              >
                <span className="text-primary">✦</span>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ WORK ============================= */}
      <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-12 text-center">
          <Eyebrow>{t.work.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            {t.work.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.work.sub}
          </p>
        </div>
        <Portfolio />
      </section>

      {/* ============================== PROCESS =========================== */}
      <section id="process" className="relative overflow-hidden py-24">
        <div className="glow-top pointer-events-none absolute inset-x-0 top-0 h-64" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
              {t.process.titleA}{" "}
              <span className="text-gradient-brand">
                {t.process.titleHighlight}
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.process.sub}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.process.steps.map((step) => (
              <div
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 ring-hair transition-colors hover:border-primary/40"
              >
                <span className="absolute -end-2 -top-4 select-none text-[7rem] font-black leading-none text-foreground/[0.04] transition-colors group-hover:text-primary/10">
                  {step.n}
                </span>
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-lg font-black text-primary">
                    {step.n}
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== PRICING =========================== */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-14 text-center">
          <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            {t.pricing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.pricing.sub}
          </p>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? "relative flex flex-col rounded-3xl border border-primary/50 bg-card p-8 glow-brand"
                  : "relative flex flex-col rounded-3xl border border-border bg-card p-8 ring-hair"
              }
            >
              {plan.featured && (
                <span className="absolute -top-3 end-8 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  {t.pricing.badge}
                </span>
              )}
              <h3 className="text-lg font-extrabold">{plan.name}</h3>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="mb-1.5 text-sm text-muted-foreground">
                  {t.pricing.currency}
                </span>
              </div>

              <ul className="mt-7 space-y-3.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={
                  plan.featured
                    ? "mt-8 rounded-full bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                    : "mt-8 rounded-full border border-border bg-secondary/50 py-3.5 text-center text-sm font-bold text-foreground transition-colors hover:bg-secondary"
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* guarantee line under the plans */}
        <div className="mt-8 flex justify-center">
          <p className="flex items-center gap-2.5 rounded-full border border-border bg-secondary/40 px-5 py-3 text-center text-xs font-semibold text-muted-foreground sm:text-sm">
            <ShieldIcon className="h-4 w-4 shrink-0 text-primary" />
            {t.pricing.guarantee}
          </p>
        </div>
      </section>

      {/* =========================== TESTIMONIALS ========================= */}
      <section
        id="testimonials"
        className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
      >
        <div className="mb-14 text-center">
          <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            {t.testimonials.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.testimonials.sub}
          </p>
        </div>
        <Testimonials />
      </section>

      {/* ================================ FAQ ============================= */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-12 text-center">
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-black sm:text-4xl md:text-5xl">
            {t.faq.title}
          </h2>
        </div>
        <Faq />
      </section>

      {/* ============================ GUARANTEES ========================== */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {t.guarantees.map((g) => (
            <div key={g.title} className="bg-background px-6 py-10 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-extrabold">{g.title}</div>
              <div className="mt-1 text-xs text-muted-foreground">{g.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== CTA ============================== */}
      <section
        id="contact"
        className="relative overflow-hidden px-4 py-28 sm:px-6"
      >
        <div className="glow-bottom pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl text-center">
          <LogoMark className="mx-auto h-14 animate-float" />
          <h2 className="mt-8 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            {t.cta.titleA}{" "}
            <span className="text-gradient-brand">{t.cta.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            {t.cta.sub}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/966500000000"
              className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              {t.cta.primary}
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-border bg-secondary/50 px-8 py-4 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              {t.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-start">
            <div className="flex items-center gap-3">
              <LogoMark className="h-10" />
              <div>
                <div className="text-lg font-extrabold">
                  <span className="text-silver">VERTEX</span>{" "}
                  <span className="text-gradient-brand">FORGE</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {t.footer.tagline}
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {t.footer.links.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-foreground">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-10 select-none text-center">
            <span className="text-[14vw] font-black leading-none tracking-tight text-foreground/[0.05] md:text-[9rem]">
              VERTEX FORGE
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <span>{t.footer.rights}</span>
            <DevCredit />
            <span className="hidden sm:inline">{t.footer.motto}</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
