"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { Header } from "../../components/header";
import { VillaCard } from "../../components/villa-card";
import { villas } from "../../lib/data";

export default function FavoritesPage() {
  const [ids, setIds] = useState<number[]>([]);
  const refresh = () => {
    try {
      setIds(JSON.parse(localStorage.getItem("vtg-favorites") || "[]"));
    } catch {
      setIds([]);
    }
  };

  useEffect(() => {
    refresh();
    window.addEventListener("vtg-favorites-changed", refresh);
    return () => window.removeEventListener("vtg-favorites-changed", refresh);
  }, []);

  const favorites = villas.filter((villa) => ids.includes(villa.id));

  return (
    <main className="min-h-screen bg-[#fbfbfa]">
      <Header />
      <section className="bg-[var(--teal)] py-20 text-white">
        <div className="container-shell">
          <Heart className="text-[var(--sun)]" />
          <p className="eyebrow mt-6 !text-[var(--sun)]">SİZE ÖZEL</p>
          <h1 className="mt-3 text-[clamp(42px,6vw,68px)] font-extrabold tracking-[-.06em]">
            Favori villalarınız
          </h1>
          <p className="mt-4 text-white/60">
            Beğendiğiniz seçenekler bu tarayıcıda saklanır.
          </p>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell">
          {favorites.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {favorites.map((villa) => (
                <VillaCard key={villa.id} villa={villa} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-14 text-center">
              <Heart className="mx-auto text-slate-300" size={34} />
              <h2 className="mt-4 text-xl font-extrabold">
                Henüz favoriniz yok
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Villa kartlarındaki kalp simgesine dokunarak listenizi
                oluşturun.
              </p>
              <Link
                href="/villalar"
                className="mt-6 inline-flex rounded-full bg-[var(--teal)] px-6 py-3 text-sm font-bold text-white"
              >
                Villaları keşfet
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
