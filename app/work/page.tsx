"use client";

import { SiteHeader } from "@/components/site-header";
import { WorkShowcase } from "@/components/work-showcase";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DevCredit } from "@/components/dev-credit";
import { LogoMark } from "@/components/logo";
import { useI18n } from "@/components/providers";
import { WHATSAPP_URL } from "@/lib/site";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-bold text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export default function WorkPage() {
  const { t } = useI18n();

  return (
    <div className="relative">
      <SiteHeader />

      {/* ================================ HERO ============================== */}
      <section className="relative overflow-hidden bg-grid">
        <div className="glow-hero pointer-events-none absolute inset-x-0 -top-40 h-[420px]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-32 text-center sm:px-6 md:pt-40">
          <Eyebrow>{t.work.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-3xl font-black sm:text-4xl md:text-5xl">
            {t.work.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t.work.pageSub}
          </p>
        </div>
      </section>

      {/* ============================== SECTIONS =========================== */}
      <div className="pb-8">
        <WorkShowcase />
      </div>

      {/* =============================== CTA ============================== */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6">
        <div className="glow-bottom pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card/60 px-6 py-14 text-center ring-hair sm:px-10">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {t.cta.titleA}{" "}
            <span className="text-gradient-brand">{t.cta.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            {t.cta.sub}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              {t.cta.primary}
            </a>
            <a
              href="/"
              className="rounded-full border border-border bg-secondary/50 px-8 py-4 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              {t.workBack}
            </a>
          </div>
        </div>
      </section>

      {/* ============================== FOOTER ============================ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-start">
            <a href="/" className="flex items-center gap-3">
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
            </a>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {t.footer.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href.startsWith("#") ? `/${l.href}` : l.href}
                  className="hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
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
