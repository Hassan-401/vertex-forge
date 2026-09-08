"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Portfolio } from "@/components/portfolio";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { DevCredit } from "@/components/dev-credit";
import { LogoMark } from "@/components/logo";
import { useI18n } from "@/components/providers";

function BackArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current rtl:-scale-x-100"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

export default function WorkPage() {
  const { t } = useI18n();

  return (
    <div className="relative">
      <SiteHeader />

      <section className="relative overflow-hidden bg-grid">
        <div className="glow-hero pointer-events-none absolute inset-x-0 -top-40 h-[420px]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-32 sm:px-6 md:pt-40">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <BackArrow />
            {t.workBack}
          </Link>

          <div className="mt-8 text-center">
            <h1 className="text-3xl font-black sm:text-4xl md:text-5xl">
              {t.work.pageTitle}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t.work.pageSub}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Portfolio sidebar />
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="h-9" />
              <div className="text-base font-extrabold">
                <span className="text-silver">VERTEX</span>{" "}
                <span className="text-gradient-brand">FORGE</span>
              </div>
            </Link>
            <DevCredit />
            <span className="text-xs text-muted-foreground">
              {t.footer.rights}
            </span>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
