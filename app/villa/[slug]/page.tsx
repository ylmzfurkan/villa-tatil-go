"use client";

import Link from "next/link";
import { Bath, BedDouble, CalendarDays, Check, ChevronDown, Heart, MapPin, Share2, ShieldCheck, Star, Users, Waves, Wifi, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Header } from "../../../components/header";
import { VillaCard } from "../../../components/villa-card";
import { villas } from "../../../lib/data";

const money = new Intl.NumberFormat("tr-TR");
const fallbackGallery = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=86",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=86",
];

export default function VillaDetailPage() {
  const params = useParams<{slug:string}>();
  const villa = villas.find((v)=>v.slug===params.slug) ?? villas[0];
  const gallery = villa.gallery.length ? villa.gallery : [villa.image, ...fallbackGallery.slice(1)];
  const [liked,setLiked] = useState(false);
  const [galleryOpen,setGalleryOpen] = useState(false);
  const [checkIn,setCheckIn] = useState("2027-06-14");
  const [checkOut,setCheckOut] = useState("2027-06-19");
  const [guests,setGuests] = useState(Math.min(4,villa.guests));
  const nights = useMemo(()=>{
    const diff = new Date(checkOut).getTime()-new Date(checkIn).getTime();
    return Math.max(1,Math.round(diff/86400000)||1);
  },[checkIn,checkOut]);
  const total = nights*villa.price;

  return <main className="min-h-screen bg-white">
    <Header />
    <div className="container-shell py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold text-slate-500">Ana Sayfa / Villalar / {villa.name}</p><h1 className="text-[clamp(34px,4vw,52px)] font-extrabold tracking-[-.055em]">{villa.name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><MapPin size={15}/>{villa.location}<span>·</span><Star size={14} fill="#e16543" className="text-[var(--coral)]"/><strong className="text-[var(--ink)]">{villa.rating}</strong> ({villa.reviews} demo yorum)</p></div><div className="flex gap-2"><button className="detail-icon"><Share2 size={17}/> <span>Paylaş</span></button><button onClick={()=>setLiked(!liked)} className="detail-icon"><Heart size={17} fill={liked?"currentColor":"none"}/> <span>Kaydet</span></button></div></div>
      <div className="grid h-[520px] grid-cols-1 gap-3 overflow-hidden rounded-[28px] md:grid-cols-2"><button onClick={()=>setGalleryOpen(true)} className="group relative overflow-hidden"><img src={gallery[0]} alt={villa.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></button><div className="hidden grid-cols-2 grid-rows-2 gap-3 md:grid">{gallery.slice(1,5).map((img,i)=><button onClick={()=>setGalleryOpen(true)} key={img} className="group relative overflow-hidden"><img src={img} alt={`${villa.name} fotoğraf ${i+2}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/>{i===3&&<span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-xs font-extrabold shadow">Tüm fotoğraflar</span>}</button>)}</div></div>
    </div>

    <section className="container-shell grid gap-12 pb-24 pt-6 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="grid grid-cols-2 gap-3 border-b border-slate-200 pb-8 sm:grid-cols-4">{[[Users,`${villa.guests} kişi`,`Kapasite`],[BedDouble,`${villa.bedrooms} oda`,`Yatak odası`],[Bath,`${villa.bathrooms} banyo`,`Banyo`],[Waves,"Özel havuz","Havuz"]].map(([Icon,value,label]:any)=><div key={label} className="rounded-2xl bg-[var(--sand)] p-4"><Icon size={20} className="mb-3 text-[var(--coral)]"/><strong className="block text-sm">{value}</strong><span className="text-xs text-slate-500">{label}</span></div>)}</div>
        <div className="detail-section"><h2>Villa hakkında</h2><p>{villa.name}, Kaş’ın eşsiz doğasına açılan özel yaşam alanı, ferah iç mekânları ve gün batımını karşılayan havuzuyla sakin bir tatil için tasarlandı. Aileler ve arkadaş grupları için mahremiyet, konfor ve Akdeniz atmosferini bir arada sunar.</p><p>Villamızda konaklamanız boyunca ihtiyaç duyabileceğiniz temel mutfak ekipmanları, klima, kablosuz internet ve düzenli havuz bakımı bulunmaktadır. Bu sayfadaki bilgiler arayüz demosu için hazırlanmış örnek içeriktir.</p></div>
        <div className="detail-section"><h2>Öne çıkan özellikler</h2><div className="grid gap-3 sm:grid-cols-2">{["Sonsuzluk havuzu","Deniz manzarası","Jakuzi","Hızlı Wi-Fi","Özel otopark","Barbekü alanı","Tam donanımlı mutfak","Klimalı odalar"].map((x)=><div key={x} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold"><Check size={17} className="text-[var(--coral)]"/>{x}</div>)}</div></div>
        <div className="detail-section"><h2>Müsaitlik takvimi</h2><p className="!mb-5 text-sm">Dolu ve opsiyonlu tarihleri kontrol ederek tatil aralığınızı planlayın.</p><div className="overflow-hidden rounded-[22px] border border-slate-200"><div className="flex items-center justify-between border-b border-slate-200 bg-[var(--sand)] p-5"><button>‹</button><strong>Haziran 2027</strong><button>›</button></div><div className="grid grid-cols-7 gap-px bg-slate-200 text-center text-xs">{["Pzt","Sal","Çar","Per","Cum","Cmt","Paz",...Array.from({length:35},(_,i)=>i<2?"":String(i-1))].map((d,i)=><span key={i} className={`${i<7?"bg-slate-50 font-bold text-slate-400":"bg-white"} ${[15,16,17,18,19].includes(+d)?"!bg-rose-50 text-rose-400 line-through":""} ${[10,11].includes(+d)?"!bg-amber-50 text-amber-700":""} min-h-10 p-3`}>{d}</span>)}</div></div><div className="mt-3 flex gap-5 text-xs text-slate-500"><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400"/>Dolu</span><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400"/>Opsiyonlu</span><span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400"/>Müsait</span></div></div>
        <div className="detail-section"><h2>Konum ve çevre</h2><div className="rounded-[24px] bg-[var(--teal)] p-6 text-white"><div className="grid gap-4 sm:grid-cols-3">{[["Kaş merkez","8 km"],["En yakın plaj","500 m"],["Dalaman Havalimanı","148 km"]].map(([x,y])=><div key={x}><span className="text-xs text-white/55">{x}</span><strong className="mt-1 block text-lg">{y}</strong></div>)}</div><div className="mt-6 h-44 rounded-2xl bg-[radial-gradient(circle_at_30%_60%,#e16543_0_5px,transparent_6px),linear-gradient(135deg,#1c5e58,#0a3b38)] opacity-90"/></div></div>
        <div className="detail-section"><h2>Konaklama kuralları</h2><div className="grid gap-3 sm:grid-cols-2">{["Giriş: 16.00 sonrası","Çıkış: 10.00 öncesi","Evcil hayvan kabul edilmez","İç mekânda sigara içilmez","Etkinlik ve parti yapılamaz","Hasar depozitosu: ₺5.000"].map((x)=><div key={x} className="flex items-center gap-3 text-sm text-slate-600"><Check size={16} className="text-[var(--teal)]"/>{x}</div>)}</div></div>
      </div>

      <aside><div className="sticky top-24 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_65px_rgba(15,47,45,.12)]"><div className="flex items-end justify-between"><div><span className="text-xs text-slate-500">Gecelik başlayan</span><strong className="mt-1 block text-2xl">₺{money.format(villa.price)}</strong></div><span className="flex items-center gap-1 text-xs font-bold"><Star size={13} fill="#e16543" className="text-[var(--coral)]"/>{villa.rating}</span></div><div className="mt-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200"><label className="border-r border-slate-200 p-3"><span className="block text-[9px] font-extrabold uppercase text-slate-400">Giriş</span><input type="date" value={checkIn} onChange={(e)=>setCheckIn(e.target.value)} className="mt-1 w-full text-xs font-bold outline-none"/></label><label className="p-3"><span className="block text-[9px] font-extrabold uppercase text-slate-400">Çıkış</span><input type="date" value={checkOut} onChange={(e)=>setCheckOut(e.target.value)} className="mt-1 w-full text-xs font-bold outline-none"/></label><label className="col-span-2 flex items-center justify-between border-t border-slate-200 p-3"><span><b className="block text-[9px] uppercase text-slate-400">Misafir</b><span className="text-xs font-bold">{guests} kişi</span></span><select value={guests} onChange={(e)=>setGuests(+e.target.value)} className="outline-none">{Array.from({length:villa.guests-1},(_,i)=>i+2).map(x=><option key={x}>{x}</option>)}</select></label></div><div className="my-5 space-y-3 text-sm"><div className="flex justify-between text-slate-500"><span>₺{money.format(villa.price)} × {nights} gece</span><span>₺{money.format(total)}</span></div><div className="flex justify-between text-slate-500"><span>Temizlik ücreti</span><span>₺0</span></div><div className="flex justify-between border-t border-slate-200 pt-4 text-base font-extrabold"><span>Toplam</span><span>₺{money.format(total)}</span></div></div><Link href={`/rezervasyon?villa=${villa.slug}&giris=${checkIn}&cikis=${checkOut}&kisi=${guests}`} className="flex w-full items-center justify-center rounded-full bg-[var(--coral)] py-4 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(225,101,67,.25)]">Rezervasyon talebi oluştur</Link><p className="mt-3 text-center text-[10px] leading-4 text-slate-400">Bu adımda ödeme alınmaz. Ekibimiz WhatsApp üzerinden sizinle iletişime geçer.</p><div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-3 text-xs text-emerald-800"><ShieldCheck size={20}/><span><b className="block">Güvenli talep</b>Bilgileriniz yalnızca rezervasyon için kullanılır.</span></div></div></aside>
    </section>
    <section className="bg-[var(--sand)] py-20"><div className="container-shell"><div className="section-head"><div><span className="eyebrow">BENZER SEÇENEKLER</span><h2 className="section-title">Bunları da sevebilirsiniz</h2></div></div><div className="grid gap-6 md:grid-cols-3">{villas.filter(v=>v.id!==villa.id).slice(0,3).map(v=><VillaCard key={v.id} villa={v}/>)}</div></div></section>
    {galleryOpen&&<div className="fixed inset-0 z-[70] overflow-auto bg-[#061e1c]/95 p-4 text-white"><button onClick={()=>setGalleryOpen(false)} className="fixed right-6 top-6 z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-[var(--ink)]"><X/></button><div className="mx-auto grid max-w-5xl gap-4 py-20 md:grid-cols-2">{gallery.map((img,i)=><img key={img} src={img} alt={`${villa.name} galeri ${i+1}`} className={`${i===0?"md:col-span-2":""} w-full rounded-3xl object-cover`}/>)}</div></div>}
  </main>;
}
