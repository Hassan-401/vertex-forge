"use client";

import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Work showcase — the /work page body. Projects are grouped into one section
 * per category (in the filter order), each a centered heading + a grid of
 * compact "list" cards: small thumbnail, name and live URL. Live projects
 * link out; ready-but-unpublished designs show a "Soon" badge instead.
 * ------------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-bold text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

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

function ProjectRow({
  project,
  view,
  soon,
}: {
  project: Project;
  view: string;
  soon: string;
}) {
  const isLive = Boolean(project.href);

  const inner = (
    <>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-secondary ring-1 ring-border">
        {project.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={encodeURI(project.image)}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        )}
      </span>

      <span className="min-w-0 flex-1 text-start">
        <span className="block truncate text-sm font-extrabold">
          {project.title}
        </span>
        {isLive ? (
          <span className="block truncate text-xs text-muted-foreground" dir="ltr">
            {project.url}
          </span>
        ) : (
          <span className="block text-xs text-muted-foreground">{soon}</span>
        )}
      </span>

      {isLive && (
        <ArrowGlyph className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      )}
    </>
  );

  const shell =
    "group flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3 ring-hair transition-colors hover:border-primary/40 hover:bg-card";

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

  return <div className={cn(shell, "opacity-80")}>{inner}</div>;
}

export function WorkShowcase() {
  const { t } = useI18n();

  const sections = t.work.filters
    .filter((f) => f.key !== "all")
    .map((f) => ({
      key: f.key,
      label: f.label,
      sub: t.work.catSub?.[f.key],
      items: (t.work.projects as Project[]).filter(
        (p) => p.category === f.key,
      ),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {sections.map((section) => (
        <section key={section.key} className="py-12 md:py-16">
          <div className="mb-8 text-center">
            <Eyebrow>{t.work.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-2xl font-black sm:text-3xl md:text-4xl">
              {section.label}
            </h2>
            {section.sub && (
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                {section.sub}
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((project) => (
              <ProjectRow
                key={project.key}
                project={project}
                view={t.work.view}
                soon={t.work.soon}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
