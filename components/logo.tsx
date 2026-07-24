import { cn } from "@/lib/utils";

/**
 * Vertex Forge "VF" monogram.
 * The left stroke of the V is silver, the right stroke doubles as the stem of
 * an orange F (with two horizontal bars) — mirroring the brand logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 108"
      className={cn("h-9 w-auto", className)}
      role="img"
      aria-label="Vertex Forge"
    >
      <defs>
        <linearGradient id="vf-silver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#cfd3db" />
          <stop offset="1" stopColor="#8a8f99" />
        </linearGradient>
        <linearGradient id="vf-orange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9a45" />
          <stop offset="0.5" stopColor="#fb6a1a" />
          <stop offset="1" stopColor="#df4a08" />
        </linearGradient>
      </defs>

      {/* V — left silver arm */}
      <polygon points="6,10 28,10 62,94 48,94" fill="url(#vf-silver)" />
      {/* V — right / F stem in orange */}
      <polygon points="58,94 44,94 78,10 100,10" fill="url(#vf-orange)" />
      {/* F top bar */}
      <polygon points="78,10 116,10 111,25 73,25" fill="url(#vf-orange)" />
      {/* F middle bar */}
      <polygon points="66,42 100,42 95,57 61,57" fill="url(#vf-orange)" />
    </svg>
  );
}

export function LogoLockup({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-9" />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-wide">
          <span className="text-silver">VERTEX</span>{" "}
          <span className="text-gradient-brand">FORGE</span>
        </span>
        {tagline && (
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            We Forge Digital Excellence
          </span>
        )}
      </div>
    </div>
  );
}
