"use client";

import Link from "next/link";
import { Heart, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const navClass = overlay
    ? "text-white/85 hover:text-white"
    : "text-slate-600 hover:text-[var(--teal)]";
  return (
    <header
      className={`${overlay ? "absolute inset-x-0 top-0 z-40 border-white/15 bg-black/10 text-white" : "sticky top-0 z-40 border-slate-200/80 bg-white/90 text-[var(--ink)] shadow-[0_1px_0_rgba(15,47,45,.05)]"} border-b backdrop-blur-xl`}
    >
      <div className="container-shell flex h-[78px] items-center justify-between">
        <Logo light={overlay} />
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Ana menü"
        >
          <Link className={`nav-link ${navClass}`} href="/villalar">
            Villalar
          </Link>
          <Link className={`nav-link ${navClass}`} href="/bolgeler">
            Bölgeler
          </Link>
          <Link className={`nav-link ${navClass}`} href="/kampanyalar">
            Fırsatlar
          </Link>
          <Link className={`nav-link ${navClass}`} href="/rehber">
            Kaş Rehberi
          </Link>
          <Link className={`nav-link ${navClass}`} href="/hakkimizda">
            Hakkımızda
          </Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/favoriler"
            className={`${overlay ? "border-white/25 text-white hover:bg-white/10" : "border-slate-200 text-slate-700 hover:bg-slate-50"} grid h-11 w-11 place-items-center rounded-full border`}
            aria-label="Favoriler"
          >
            <Heart size={18} />
          </Link>
          <Link
            href="/iletisim"
            className={`${overlay ? "bg-white text-[var(--teal)]" : "bg-[var(--teal)] text-white"} inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-bold shadow-sm`}
          >
            <Phone size={16} /> <span>+90 555 000 00 00</span>
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`${overlay ? "border-white/30" : "border-slate-200"} grid h-11 w-11 place-items-center rounded-full border lg:hidden`}
          aria-label="Menüyü aç"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 text-[var(--ink)] lg:hidden">
          <div className="flex flex-col gap-1">
            {[
              ["Villalar", "/villalar"],
              ["Bölgeler", "/bolgeler"],
              ["Fırsatlar", "/kampanyalar"],
              ["Kaş Rehberi", "/rehber"],
              ["Hakkımızda", "/hakkimizda"],
              ["Favoriler", "/favoriler"],
              ["İletişim", "/iletisim"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-[var(--sand)]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
