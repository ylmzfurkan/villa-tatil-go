import Link from "next/link";

export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="Villa Tatil Go ana sayfa">
      <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[15px] bg-[var(--coral)] text-white shadow-[0_8px_24px_rgba(225,101,67,.22)]">
        <svg viewBox="0 0 44 44" className="h-9 w-9" aria-hidden="true">
          <circle cx="31" cy="12" r="4" fill="#FFD79C" />
          <path d="M8 27.5 21.2 15 35 27.5v9H8z" fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round" />
          <path d="M15 36.5v-8h12v8M7 31c5 0 5 3 10 3s5-3 10-3 5 3 10 3" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className={`text-[20px] font-extrabold tracking-[-.045em] ${light ? "text-white" : "text-[var(--ink)]"}`}>
          VillaTatil<span className="text-[var(--coral)]">Go</span>
        </span>
      )}
    </Link>
  );
}
