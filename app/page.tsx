"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "../components/header";
import { Logo } from "../components/logo";
import { VillaCard } from "../components/villa-card";
import { villas } from "../lib/data";

const categories = [
  {
    name: "Deniz Manzaralı",
    count: 18,
    image: villas[0].image,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Balayı Villaları",
    count: 12,
    image: villas[1].image,
    className: "",
  },
  { name: "Muhafazakâr", count: 21, image: villas[2].image, className: "" },
  {
    name: "Aile Villaları",
    count: 16,
    image: villas[3].image,
    className: "md:col-span-2",
  },
];

export default function Home() {
  const router = useRouter();
  const [guests, setGuests] = useState(2);
  const [location, setLocation] = useState("Kaş");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  function search() {
    const query = new URLSearchParams({ location, guests: String(guests) });
    if (checkIn) query.set("checkin", checkIn);
    if (checkOut) query.set("checkout", checkOut);
    router.push(`/villalar?${query}`);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <section className="relative min-h-[790px] overflow-hidden bg-[var(--teal)] text-white">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=92"
          alt="Kaş'ta deniz manzaralı havuzlu villa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,36,34,.88)_0%,rgba(5,36,34,.58)_48%,rgba(5,36,34,.15)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,36,34,.65)_0%,transparent_50%)]" />
        <Header overlay />
        <div className="container-shell relative z-10 flex min-h-[790px] flex-col justify-center pb-28 pt-32">
          <div className="max-w-[820px]">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={15} className="text-[var(--sun)]" /> Kaş’ın seçkin
              villaları, tek bir yerde
            </div>
            <h1 className="font-display max-w-[800px] text-[clamp(52px,7vw,92px)] leading-[.94] tracking-[-.055em]">
              Akdeniz’deki{" "}
              <em className="font-normal text-[var(--sun)]">eviniz</em> hazır.
            </h1>
            <p className="mt-7 max-w-[650px] text-lg leading-8 text-white/78 md:text-xl">
              Kaş ve çevresindeki özenle seçilmiş villaları keşfedin; tarihinizi
              seçin, fiyatınızı görün, tatilinizi güvenle planlayın.
            </p>
          </div>
          <div className="mt-12 rounded-[26px] border border-white/20 bg-white p-3 text-[var(--ink)] shadow-[0_28px_80px_rgba(3,32,30,.3)] md:grid md:grid-cols-[1.05fr_1fr_1fr_.7fr_auto] md:items-center md:gap-1">
            <label className="search-field">
              <span>
                <MapPin size={15} /> Bölge
              </span>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>Kaş</option>
                <option>Kalkan</option>
                <option>Patara</option>
                <option>İslamlar</option>
              </select>
              <ChevronDown size={15} />
            </label>
            <label className="search-field">
              <span>
                <CalendarDays size={15} /> Giriş
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>
            <label className="search-field">
              <span>
                <CalendarDays size={15} /> Çıkış
              </span>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
            <label className="search-field">
              <span>
                <Users size={15} /> Misafir
              </span>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {[2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} kişi
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
            <button
              onClick={search}
              className="mt-2 flex h-[62px] items-center justify-center gap-2 rounded-[18px] bg-[var(--coral)] px-7 text-sm font-extrabold text-white transition hover:bg-[#cb5335] md:mt-0"
            >
              <Search size={18} /> Villa Bul
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/80">
            <span className="font-bold text-white">Popüler:</span>
            {["Deniz manzaralı", "Balayı", "Korunaklı havuz", "Son dakika"].map(
              (tag) => (
                <Link
                  key={tag}
                  href="/villalar"
                  className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 hover:bg-white/15"
                >
                  {tag}
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-14">
        <div className="container-shell">
          <a
            href="https://online.tursab.org.tr/publicpages/embedded/agencysearch/"
            target="_blank"
            rel="noreferrer"
            aria-label="TÜRSAB acenta doğrulama sayfasını yeni sekmede aç, Belge No 4035"
            className="group mx-auto mb-3 flex w-fit max-w-full items-center gap-3 rounded-full border border-white/20 bg-[#062825] px-4 py-2.5 text-white shadow-[0_14px_35px_rgba(6,40,37,.28)] transition hover:-translate-y-0.5 hover:bg-[#0b3935] sm:px-5"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[var(--teal)]">
              <ShieldCheck size={17} />
            </span>
            <span className="min-w-0 text-[11px] font-semibold text-white/75 sm:text-xs">
              Lisanslı A Grubu Seyahat Acentası
              <span className="mx-2 text-white/25">·</span>
              Belge No <strong className="text-[var(--sun)]">4035</strong>
            </span>
            <ArrowRight
              size={14}
              className="shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white"
            />
          </a>
          <div className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,47,45,.12)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Doğrulanmış villalar", "Kontrollü portföy"],
              [Headphones, "Yerel destek", "Haftanın 7 günü"],
              [CalendarDays, "Güncel takvim", "Anlık müsaitlik"],
              [CheckCircle2, "Şeffaf fiyat", "Sürpriz ücret yok"],
            ].map(([Icon, title, text]: any) => (
              <div
                key={title}
                className="flex items-center gap-4 border-b border-slate-100 px-6 py-6 last:border-0 sm:border-r lg:border-b-0"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--sand)] text-[var(--coral)]">
                  <Icon size={21} />
                </span>
                <div>
                  <strong className="block text-sm text-[var(--ink)]">
                    {title}
                  </strong>
                  <span className="text-xs text-slate-500">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">SEÇKİN PORTFÖY</span>
              <h2 className="section-title">Kaş’ta öne çıkan villalar</h2>
              <p className="section-copy">
                Her tatil beklentisine uygun, özenle seçilmiş konaklama
                seçenekleri.
              </p>
            </div>
            <Link href="/villalar" className="text-link">
              Tüm villaları gör <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {villas.slice(0, 3).map((villa) => (
              <VillaCard key={villa.id} villa={villa} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-[var(--sand)]">
        <div className="container-shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">SİZE UYGUN TATİL</span>
              <h2 className="section-title">Nasıl bir villa arıyorsunuz?</h2>
              <p className="section-copy">
                Tatil tarzınızı seçin, size en uygun villaları saniyeler içinde
                keşfedin.
              </p>
            </div>
          </div>
          <div className="grid auto-rows-[250px] gap-4 md:grid-cols-4">
            {categories.map((cat) => (
              <Link
                href="/villalar"
                key={cat.name}
                className={`group relative overflow-hidden rounded-[26px] ${cat.className}`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                  <div>
                    <h3 className="text-xl font-extrabold">{cat.name}</h3>
                    <p className="mt-1 text-sm text-white/75">
                      {cat.count} villa
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-white group-hover:text-[var(--teal)]">
                    <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=88"
              alt="Akdeniz kıyısı"
              className="absolute inset-0 h-[500px] w-[86%] rounded-[34px] object-cover"
            />
            <div className="absolute bottom-0 right-0 w-[62%] rounded-[28px] border-8 border-white bg-[var(--teal)] p-7 text-white shadow-xl">
              <p className="font-display text-3xl leading-tight">
                “Kaş’ı bilen bir ekip, tatilinizi kolaylaştırır.”
              </p>
              <p className="mt-3 text-sm text-white/65">
                VillaTatilGo yerel hizmet yaklaşımı
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">AKDENİZ’İN SAKİN KÖŞESİ</span>
            <h2 className="section-title mt-3">Kaş’ın ritmine karışın.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Turkuaz koylar, begonvilli sokaklar ve gün batımına açılan özel
              havuzlar… VillaTatilGo, Kaş ve çevresindeki tatil evlerini tek bir
              özenli seçkide buluşturur.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                "Yerel bölge bilgisi",
                "İhtiyaca göre öneri",
                "Şeffaf rezervasyon süreci",
                "Konaklama öncesi destek",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-bold text-[var(--ink)]"
                >
                  <CheckCircle2 size={19} className="text-[var(--coral)]" />
                  {item}
                </div>
              ))}
            </div>
            <Link
              href="/hakkimizda"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--teal)] px-6 py-3.5 text-sm font-bold text-white"
            >
              Bizi tanıyın <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space bg-[var(--teal)] text-white">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow !text-[var(--sun)]">3 KOLAY ADIM</span>
            <h2 className="section-title mt-3 !text-white">
              Tatilinizi kolayca planlayın
            </h2>
            <p className="mt-4 text-white/65">
              Karmaşık ödeme ekranları yok. Villanızı seçin, talebinizi iletin,
              ekibimiz sizinle iletişime geçsin.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              [
                Search,
                "01",
                "Villanızı keşfedin",
                "Tarih, bölge ve kişi sayısına göre size uygun seçenekleri bulun.",
              ],
              [
                CalendarDays,
                "02",
                "Talebinizi oluşturun",
                "Müsait tarihleri seçin, toplam tutarı görün ve iletişim bilgilerinizi bırakın.",
              ],
              [
                Headphones,
                "03",
                "Tatilinizi netleştirin",
                "Ekibimiz WhatsApp üzerinden sizinle iletişime geçerek rezervasyonu tamamlasın.",
              ],
            ].map(([Icon, no, title, text]: any) => (
              <div
                key={no}
                className="relative rounded-[26px] border border-white/12 bg-white/[.06] p-7"
              >
                <span className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-white text-[var(--teal)]">
                  <Icon size={21} />
                </span>
                <span className="absolute right-6 top-5 font-display text-5xl text-white/10">
                  {no}
                </span>
                <h3 className="text-xl font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer id="demo-contact" className="bg-[#062825] pb-8 pt-16 text-white">
        <div className="container-shell grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Kaş ve çevresinde unutulmaz bir villa tatili için yerel, şeffaf ve
              sıcak bir yaklaşım.
            </p>
            <span className="mt-5 inline-flex rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-bold text-white/50">
              DEMO MARKA / ÖRNEK İÇERİK
            </span>
            <a
              href="https://online.tursab.org.tr/publicpages/embedded/agencysearch/"
              target="_blank"
              rel="noreferrer"
              aria-label="TÜRSAB acenta doğrulama sayfasını yeni sekmede aç, Belge No 4035"
              className="mt-6 block w-fit max-w-full overflow-hidden rounded-md shadow-[0_12px_30px_rgba(0,0,0,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(0,0,0,.3)]"
            >
              <img
                src="/tursab-dds-4035.png"
                alt="TÜRSAB Dijital Doğrulama Sistemi, Belge No 4035"
                width="290"
                height="132"
                loading="lazy"
                decoding="async"
                className="h-auto w-[290px] max-w-full"
              />
            </a>
          </div>
          <div>
            <h4 className="footer-title">Keşfet</h4>
            {[
              "Tüm Villalar",
              "Balayı Villaları",
              "Muhafazakâr Villalar",
              "Son Dakika",
            ].map((x) => (
              <Link key={x} href="/villalar" className="footer-link">
                {x}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="footer-title">Bölgeler</h4>
            {["Kaş", "Kalkan", "Patara", "İslamlar"].map((x) => (
              <Link key={x} href="/bolgeler" className="footer-link">
                {x}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="footer-title">İletişim</h4>
            <p className="footer-link">+90 555 000 00 00</p>
            <p className="footer-link">merhaba@villatatilgo.test</p>
            <p className="footer-link">Kaş / Antalya</p>
          </div>
        </div>
        <div className="container-shell flex flex-col justify-between gap-3 pt-7 text-xs text-white/40 sm:flex-row">
          <span>© 2026 VillaTatilGo · Demo çalışma</span>
          <span>KVKK · Gizlilik · Kiralama Koşulları</span>
        </div>
      </footer>
    </main>
  );
}
