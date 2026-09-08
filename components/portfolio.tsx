"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 fill-none stroke-current", className)}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

type Project = {
  key: string;
  title: string;
  category: string;
  tag: string;
  url?: string;
  href?: string;
  image?: string;
};

function ProjectCard({
  project,
  view,
  soon,
}: {
  project: Project;
  view: string;
  soon: string;
}) {
  // Live projects carry a real deployment link; the "coming soon" store
  // designs don't — those render as a non-clickable card with a Soon badge.
  const isLive = Boolean(project.href);
  const image = project.image ?? "";

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={encodeURI(image)}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <span className="absolute start-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
          {project.tag}
        </span>
        {!isLive && (
          <span className="absolute end-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground">
            {soon}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold leading-snug">{project.title}</h3>
        {project.url && (
          <p className="mt-1 truncate text-xs text-muted-foreground" dir="ltr">
            {project.url}
          </p>
        )}
        <span
          className={cn(
            "mt-4 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-transform",
            isLive
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 group-hover:-translate-y-0.5"
              : "border border-border bg-secondary/50 text-muted-foreground",
          )}
        >
          {isLive ? view : soon}
          {isLive && (
            <ArrowGlyph className="transition-transform group-hover:translate-x-0.5" />
          )}
        </span>
      </div>
    </>
  );

  const shell =
    "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card ring-hair transition-transform duration-300 hover:-translate-y-1.5";

  if (isLive) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${view}: ${project.title}`}
        className={shell}
      >
        {inner}
      </a>
    );
  }

  return <div className={shell}>{inner}</div>;
}

export function Portfolio({
  limit,
  showViewMore,
  sidebar,
}: {
  limit?: number;
  showViewMore?: boolean;
  sidebar?: boolean;
}) {
  const { t } = useI18n();
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? t.work.projects
      : t.work.projects.filter((p) => p.category === active);

  const shown = limit ? filtered.slice(0, limit) : filtered;

  const filterButtons = t.work.filters.map((f) => (
    <button
      key={f.key}
      type="button"
      onClick={() => setActive(f.key)}
      className={cn(
        "rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
        sidebar && "lg:w-full lg:text-start",
        active === f.key
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
      )}
    >
      {f.label}
    </button>
  ));

  const grid =
    shown.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center text-muted-foreground">
        {t.work.empty}
      </div>
    ) : (
      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2",
          sidebar ? "xl:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {shown.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            view={t.work.view}
            soon={t.work.soon}
          />
        ))}
      </div>
    );

  // Side-filter layout — used on the dedicated /work page.
  if (sidebar) {
    return (
      <div className="lg:flex lg:items-start lg:gap-10">
        <aside className="lg:sticky lg:top-28 lg:w-56 lg:shrink-0">
          <div className="flex flex-wrap justify-center gap-2 lg:flex-col lg:justify-start lg:gap-1.5">
            {filterButtons}
          </div>
        </aside>
        <div className="mt-8 flex-1 lg:mt-0">{grid}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filterButtons}
      </div>

      {grid}

      {showViewMore && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:-translate-y-0.5"
          >
            {t.work.viewMore}
            <ArrowGlyph />
          </Link>
        </div>
      )}
    </div>
  );
}
