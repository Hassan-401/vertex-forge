"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

const WHATSAPP = "https://wa.me/201154649393";
const WEBSITE = "https://hassan-portfolio-azure-omega.vercel.app/";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-[18px] w-[18px] fill-current">
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.73 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.01c7.06 0 12.8-5.74 12.8-12.8s-5.75-12.8-12.8-12.8zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4a10.55 10.55 0 0 1-1.62-5.63c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.51 1.11 7.52 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.87-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z" />
    </svg>
  );
}

function GlobeGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px] fill-none stroke-current"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

export function DevCredit() {
  const { t } = useI18n();
  const dev = t.footer.dev;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on Escape, and on an outside tap (the toggle path used on touch).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const initials = dev.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      ref={wrapRef}
      className="relative inline-flex flex-col items-center"
      // Opens on hover and then stays put — moving the mouse away must not
      // close it, so the card can be reached and clicked. It closes only on an
      // outside click, Escape, or tabbing away.
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      {/* Hover card — always LTR so the Latin name block keeps its layout. */}
      <div
        dir="ltr"
        role="dialog"
        aria-label={dev.name}
        className={cn(
          "absolute bottom-full z-50 mb-3 w-72 origin-bottom rounded-2xl border border-border bg-card p-4 shadow-2xl shadow-black/30 transition-all duration-200",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 text-right">
            <div className="truncate text-lg font-extrabold leading-tight">
              {dev.name}
            </div>
            <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              {dev.role}
            </div>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-black uppercase text-primary-foreground">
            {initials}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dev.whatsappAria}
            title={dev.whatsappAria}
            className="flex h-11 items-center justify-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-[#25D366]"
          >
            <WhatsAppGlyph />
          </a>
          <a
            href={WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dev.websiteAria}
            title={dev.websiteAria}
            className="flex h-11 items-center justify-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <GlobeGlyph />
          </a>
        </div>

        {/* arrow pointing down at the trigger */}
        <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card" />
      </div>

      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${dev.prefix}: ${dev.name}`}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <span dir="ltr" className="flex items-center gap-1.5">
          <span>{dev.prefix}:</span>
          <span className="font-bold text-primary">{dev.name}</span>
        </span>
        <span className="flex h-5 w-6 items-center justify-center rounded-md bg-primary/15 font-mono text-[10px] font-bold text-primary">
          {"</>"}
        </span>
      </button>
    </div>
  );
}
