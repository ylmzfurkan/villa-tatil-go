"use client";

import {
  CalendarDays,
  ChevronDown,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "../../components/header";
import { VillaCard } from "../../components/villa-card";
import { villas } from "../../lib/data";

const categories = [
  "Tümü",
  "Deniz Manzaralı",
  "Balayı",
  "Muhafazakâr",
  "Aile",
  "Lüks",
  "Doğa",
];

export default function VillasPage() {
  const [category, setCategory] = useState("Tümü");
  const [guests, setGuests] = useState(2);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Önerilen");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [features, setFeatures] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let result = villas.filter(
      (v) =>
        (category === "Tümü" || v.category === category) &&
        v.guests >= guests &&
        v.price <= maxPrice &&
        features.every((feature) =>
          v.tags.some((tag) =>
            tag
              .toLocaleLowerCase("tr")
              .includes(feature.toLocaleLowerCase("tr")),
          ),
        ) &&
        (v.name + v.location)
          .toLocaleLowerCase("tr")
          .includes(query.toLocaleLowerCase("tr")),
    );
    if (sort === "Fiyat: Artan")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "Fiyat: Azalan")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [category, guests, maxPrice, query, sort, features]);

  const Filters = () => (
    <div className="space-y-7">
      <div>
        <p className="filter-label">Tatil tarihi</p>
        <div className="grid gap-2">
          <label className="filter-box">
            <CalendarDays size={17} />
            <input
              aria-label="Giriş tarihi"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-xs outline-none"
            />
          </label>
          <label className="filter-box">
            <CalendarDays size={17} />
            <input
              aria-label="Çıkış tarihi"
              type="date"
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-xs outline-none"
            />
          </label>
        </div>
      </div>
      <div>
        <p className="filter-label">Villa tipi</p>
        <div className="space-y-2">
          {categories.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="radio"
                checked={category === item}
                onChange={() => setCategory(item)}
                className="accent-[var(--teal)]"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="filter-label !mb-0">Kişi sayısı</p>
          <strong className="text-sm text-[var(--teal)]">{guests}+ kişi</strong>
        </div>
        <input
          className="mt-4 w-full accent-[var(--coral)]"
          type="range"
          min="2"
          max="10"
          step="1"
          value={guests}
          onChange={(e) => setGuests(+e.target.value)}
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="filter-label !mb-0">Gecelik bütçe</p>
          <strong className="text-sm text-[var(--teal)]">
            ₺{maxPrice.toLocaleString("tr-TR")}
          </strong>
        </div>
        <input
          className="mt-4 w-full accent-[var(--coral)]"
          type="range"
          min="7000"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(+e.target.value)}
        />
        <div className="mt-1 flex justify-between text-[10px] text-slate-400">
          <span>₺7.000</span>
          <span>₺20.000+</span>
        </div>
      </div>
      <div>
        <p className="filter-label">Popüler özellikler</p>
        {["Korunaklı havuz", "Jakuzi", "Deniz manzarası", "Isıtmalı havuz"].map(
          (x) => (
            <label
              key={x}
              className="mb-2 flex items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="checkbox"
                checked={features.includes(x)}
                onChange={() =>
                  setFeatures((current) =>
                    current.includes(x)
                      ? current.filter((item) => item !== x)
                      : [...current, x],
                  )
                }
                className="accent-[var(--teal)]"
              />
              {x}
            </label>
          ),
        )}
      </div>
      <button
        onClick={() => {
          setCategory("Tümü");
          setGuests(2);
          setMaxPrice(20000);
          setFeatures([]);
          setCheckIn("");
          setCheckOut("");
          setQuery("");
        }}
        className="w-full rounded-full border border-slate-200 py-3 text-xs font-bold text-slate-600"
      >
        Filtreleri temizle
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fbfbfa]">
      <Header />
      <section className="border-b border-slate-200 bg-[var(--sand)] py-12">
        <div className="container-shell">
          <span className="eyebrow">KAŞ VİLLALARI</span>
          <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-[clamp(38px,5vw,60px)] font-extrabold tracking-[-.06em] text-[var(--ink)]">
                Hayalinizdeki villayı bulun
              </h1>
              <p className="mt-3 text-slate-600">
                Kaş ve çevresindeki seçkin villa koleksiyonumuzu keşfedin.
              </p>
            </div>
            <div className="relative w-full md:w-[320px]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Villa veya bölge ara"
                className="h-12 w-full rounded-full border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[var(--teal)]"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="container-shell py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            <strong className="text-[var(--ink)]">
              {filtered.length} villa
            </strong>{" "}
            kriterlerinize uygun
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilters(true)}
              className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold lg:hidden"
            >
              <SlidersHorizontal size={15} /> Filtrele
            </button>
            <label className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-11 appearance-none rounded-full border border-slate-200 bg-white pl-4 pr-10 text-xs font-bold outline-none"
              >
                <option>Önerilen</option>
                <option>Fiyat: Artan</option>
                <option>Fiyat: Azalan</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              />
            </label>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-[24px] border border-slate-200 bg-white p-6 lg:block">
            <Filters />
          </aside>
          <div className="space-y-5">
            {filtered.length ? (
              filtered.map((villa) => (
                <VillaCard key={villa.id} villa={villa} horizontal />
              ))
            ) : (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-16 text-center">
                <Search className="mx-auto text-slate-300" />
                <h2 className="mt-4 text-xl font-bold">
                  Bu kriterlerde villa bulunamadı
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Filtreleri genişleterek tekrar deneyebilirsiniz.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute inset-y-0 right-0 w-[min(90%,380px)] overflow-auto bg-white p-6">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Filtreler</h2>
              <button
                onClick={() => setMobileFilters(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <Filters />
            <button
              onClick={() => setMobileFilters(false)}
              className="sticky bottom-4 mt-5 w-full rounded-full bg-[var(--coral)] py-4 text-sm font-bold text-white"
            >
              {filtered.length} villayı göster
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
