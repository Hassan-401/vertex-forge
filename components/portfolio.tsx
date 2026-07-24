"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

/** Preview colours per project, keyed by the stable project key. */
const COLORS: Record<string, { from: string; to: string }> = {
  luluah: { from: "#3b1d0e", to: "#fb6a1a" },
  nimbus: { from: "#0e1a3b", to: "#3b82f6" },
  atlq: { from: "#2a0e3b", to: "#a855f7" },
  rawaj: { from: "#0e3b2a", to: "#10b981" },
  itrk: { from: "#3b0e1d", to: "#f43f5e" },
  thawq: { from: "#3b280e", to: "#f59e0b" },
};

export function Portfolio() {
  const { t } = useI18n();
  const [active, setActive] = useState("all");

  const shown =
    active === "all"
      ? t.work.projects
      : t.work.projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {t.work.filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActive(f.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
              active === f.key
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => {
          const c = COLORS[project.key] ?? { from: "#1d1d22", to: "#fb6a1a" };
          return (
            <div
              key={project.key}
              className="group overflow-hidden rounded-2xl border border-border bg-card ring-hair transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* browser chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <div className="mx-auto flex items-center gap-2 rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 fill-none stroke-current"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  {project.url}
                </div>
              </div>

              {/* faux preview — intentionally dark in both themes, like a screenshot */}
              <div
                className="relative flex h-56 flex-col justify-end p-5"
                style={{
                  backgroundImage: `radial-gradient(120% 120% at 80% 0%, ${c.to}44, transparent 55%), linear-gradient(160deg, ${c.from}, #0b0b0e)`,
                }}
              >
                <div className="absolute end-5 top-5 h-8 w-8 rounded-lg bg-white/10 backdrop-blur" />
                <div className="absolute end-5 top-16 h-2.5 w-24 rounded-full bg-white/15" />
                <div className="absolute end-5 top-[86px] h-2.5 w-16 rounded-full bg-white/10" />
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white"
                      style={{ backgroundColor: c.to }}
                    >
                      {project.tag}
                    </span>
                    <h3 className="mt-3 text-xl font-extrabold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="flex h-11 w-11 -rotate-45 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-transform duration-300 group-hover:rotate-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-none stroke-current"
                      strokeWidth="2.5"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
