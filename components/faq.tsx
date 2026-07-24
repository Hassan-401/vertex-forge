"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card ring-hair">
      {t.faq.items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start md:px-7"
            >
              <span className="text-base font-bold md:text-lg">{item.q}</span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-all",
                  isOpen
                    ? "rotate-45 border-primary bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-none stroke-current"
                  strokeWidth="2.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-7 text-muted-foreground md:px-7 md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
