"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth="2.5"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function BrowserChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      <div className="mx-auto flex max-w-[75%] items-center gap-2 truncate rounded-md bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
        <svg
          viewBox="0 0 24 24"
          className="h-3 w-3 shrink-0 fill-none stroke-current"
          strokeWidth="2"
        >
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span className="truncate">{label}</span>
      </div>
    </div>
  );
}

function Preview({
  image,
  title,
  tag,
  soon,
  live,
}: {
  image: string;
  title: string;
  tag: string;
  soon?: string;
  live?: boolean;
}) {
  return (
    <div className="relative h-56 overflow-hidden bg-[#0b0b0e]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={encodeURI(image)}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />

      {soon ? (
        <span className="absolute end-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
          {soon}
        </span>
      ) : (
        <span className="absolute end-4 top-4 flex h-9 w-9 -rotate-45 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition-transform duration-300 group-hover:rotate-0">
          <ArrowGlyph />
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white",
            live ? "bg-primary" : "bg-white/20 backdrop-blur",
          )}
        >
          {tag}
        </span>
        <h3 className="mt-3 text-xl font-extrabold text-white drop-shadow">
          {title}
        </h3>
      </div>
    </div>
  );
}

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

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center text-muted-foreground">
          {t.work.empty}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => {
            // Company sites are live (they carry an href) and link out to the
            // real deployment; stores are ready designs not yet online.
            const isLive = "href" in project && Boolean(project.href);
            const image = project.image ?? "";

            if (isLive) {
              return (
                <a
                  key={project.key}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.work.visit}: ${project.title}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card ring-hair transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <BrowserChrome label={project.url ?? ""} />
                  <Preview
                    image={image}
                    title={project.title}
                    tag={project.tag}
                    live
                  />
                </a>
              );
            }

            return (
              <div
                key={project.key}
                className="group overflow-hidden rounded-2xl border border-border bg-card ring-hair transition-transform duration-300 hover:-translate-y-1.5"
              >
                <BrowserChrome label={t.work.soon} />
                <Preview
                  image={image}
                  title={project.title}
                  tag={project.tag}
                  soon={t.work.soon}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
