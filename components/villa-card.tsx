"use client";

import Link from "next/link";
import { Bath, BedDouble, Heart, MapPin, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Villa } from "../lib/data";

const money = new Intl.NumberFormat("tr-TR");

export function VillaCard({
  villa,
  horizontal = false,
}: {
  villa: Villa;
  horizontal?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("vtg-favorites") || "[]",
      ) as number[];
      setLiked(saved.includes(villa.id));
    } catch {}
  }, [villa.id]);

  const toggleFavorite = () => {
    const next = !liked;
    setLiked(next);
    try {
      const saved = JSON.parse(
        localStorage.getItem("vtg-favorites") || "[]",
      ) as number[];
      const updated = next
        ? Array.from(new Set([...saved, villa.id]))
        : saved.filter((id) => id !== villa.id);
      localStorage.setItem("vtg-favorites", JSON.stringify(updated));
      window.dispatchEvent(new Event("vtg-favorites-changed"));
    } catch {}
  };
  return (
    <article
      className={`group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_12px_40px_rgba(15,47,45,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,47,45,.12)] ${horizontal ? "md:grid md:grid-cols-[300px_1fr]" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${horizontal ? "min-h-[250px]" : "aspect-[1.35]"}`}
      >
        <img
          src={villa.image}
          alt={`${villa.name} havuz ve dış görünüm`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          {villa.discount ? (
            <span className="rounded-full bg-[var(--coral)] px-3 py-1.5 text-xs font-extrabold text-white shadow-md">
              {villa.discount}
            </span>
          ) : (
            <span />
          )}
          <button
            onClick={toggleFavorite}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[var(--teal)] shadow-md backdrop-blur"
            aria-label={liked ? "Favorilerden çıkar" : "Favoriye ekle"}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="flex flex-col p-5 md:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <MapPin size={13} />
              {villa.location}
            </p>
            <h3 className="text-xl font-extrabold tracking-[-.03em] text-[var(--ink)]">
              {villa.name}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
            <Star size={13} fill="currentColor" />
            {villa.rating}
          </span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {villa.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mb-5 flex items-center gap-4 border-y border-slate-100 py-3 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users size={15} /> {villa.guests} kişi
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} /> {villa.bedrooms} oda
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={15} /> {villa.bathrooms} banyo
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">
              Gecelik başlayan fiyat
            </p>
            <div className="flex items-baseline gap-2">
              <strong className="text-xl font-extrabold text-[var(--ink)]">
                ₺{money.format(villa.price)}
              </strong>
              {villa.oldPrice && (
                <del className="text-xs text-slate-400">
                  ₺{money.format(villa.oldPrice)}
                </del>
              )}
            </div>
          </div>
          <Link
            href={`/villa/${villa.slug}`}
            className="rounded-full bg-[var(--teal)] px-5 py-3 text-xs font-extrabold text-white transition hover:bg-[var(--teal-dark)]"
          >
            İncele
          </Link>
        </div>
      </div>
    </article>
  );
}
