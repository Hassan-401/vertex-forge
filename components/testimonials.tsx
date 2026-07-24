"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

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

/** Cards shown at once: 3 on desktop, 2 on tablet, 1 on mobile. */
function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const tiers = [
      { mq: window.matchMedia("(min-width: 1024px)"), value: 3 },
      { mq: window.matchMedia("(min-width: 640px)"), value: 2 },
    ];
    const compute = () =>
      setPerView(tiers.find((tier) => tier.mq.matches)?.value ?? 1);

    compute();
    tiers.forEach((tier) => tier.mq.addEventListener("change", compute));
    return () =>
      tiers.forEach((tier) => tier.mq.removeEventListener("change", compute));
  }, []);

  return perView;
}

export function Testimonials() {
  const { t, locale } = useI18n();
  const items = t.testimonials.items;
  const perView = usePerView();
  const [page, setPage] = useState(0);

  const pageCount = Math.ceil(items.length / perView);

  // Keep the current page valid when the viewport (and so perView) changes.
  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const isRtl = locale === "ar";

  // Index of the first card on this page, clamped so the final page ends flush
  // with the last card instead of leaving a gap (14 items / 3 per view).
  const firstCard = Math.min(page * perView, Math.max(0, items.length - perView));
  const offset = firstCard * (100 / perView);

  const chevron = useMemo(
    () => (dir: "prev" | "next") => {
      const pointsLeft = dir === (isRtl ? "next" : "prev");
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn("h-5 w-5 fill-none stroke-current", !pointsLeft && "rotate-180")}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    },
    [isRtl],
  );

  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  return (
    <div>
      {/* Viewport. Forced to LTR so the translate maths is the same in both
          languages; each card restores the reading direction itself. */}
      <div className="overflow-hidden" dir="ltr">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset}%)` }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              // min-w-0 stops the flex default of min-width:auto, which would
              // otherwise let the review text push the slide past its basis.
              className="min-w-0 shrink-0 grow-0 px-3"
              style={{ flexBasis: `${100 / perView}%` }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 ring-hair">
                <Stars />
                <blockquote className="mt-5 flex-1 leading-8 text-foreground/90">
                  “{item.body}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-black text-primary">
                    {item.initial}
                  </span>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.role}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-9 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={atStart}
          aria-label={t.testimonials.prev}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-35 disabled:hover:bg-transparent"
        >
          {chevron("prev")}
        </button>

        {/* Dots stay readable only for a handful of pages; past that show a
            compact counter instead (e.g. 1 card per view on mobile). */}
        {pageCount <= 7 ? (
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === page
                    ? "w-7 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground/50",
                )}
              />
            ))}
          </div>
        ) : (
          <span className="min-w-16 text-center text-sm font-bold tabular-nums text-muted-foreground">
            {page + 1} / {pageCount}
          </span>
        )}

        <button
          type="button"
          onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          disabled={atEnd}
          aria-label={t.testimonials.next}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary disabled:opacity-35 disabled:hover:bg-transparent"
        >
          {chevron("next")}
        </button>
      </div>
    </div>
  );
}
