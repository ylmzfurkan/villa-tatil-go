import Link from "next/link";
import { ArrowRight, BookOpen, Heart, MapPin, Sparkles } from "lucide-react";
import { Header } from "../../components/header";
import { VillaCard } from "../../components/villa-card";
import { villas } from "../../lib/data";

const content:Record<string,{eyebrow:string;title:string;copy:string}>={
  bolgeler:{eyebrow:"BÖLGE REHBERİ",title:"Kaş ve çevresini keşfedin",copy:"Koylardan dağ köylerine, tatilinizin ruhuna en uygun bölgeyi bulun."},
  kampanyalar:{eyebrow:"SINIRLI SÜRELİ",title:"Kaçırılmayacak villa fırsatları",copy:"Seçili tarihlerde avantajlı fiyatlarla Akdeniz tatilinizi planlayın."},
  rehber:{eyebrow:"VILLATATILGO REHBER",title:"Kaş’ı yerel biri gibi yaşayın",copy:"Plajlar, restoranlar, antik rotalar ve günübirlik gezi önerileri."},
  hakkimizda:{eyebrow:"BİZİ TANIYIN",title:"Kaş sevgisinden doğan bir tatil markası",copy:"Doğru villayı bulmayı kolaylaştıran, yerel ve şeffaf bir deneyim tasarlıyoruz."},
  favoriler:{eyebrow:"SİZE ÖZEL",title:"Beğendiğiniz villalar",copy:"Favorilerinize eklediğiniz seçenekleri burada karşılaştırabilirsiniz."},
  iletisim:{eyebrow:"BİZE ULAŞIN",title:"Tatil planınızı birlikte oluşturalım",copy:"Sorularınız ve rezervasyon talepleriniz için demo iletişim kanallarımızdan bize ulaşabilirsiniz."},
};

export default async function GenericPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const item=content[slug]??content.rehber;
  const icon=slug==="bolgeler"?<MapPin/>:slug==="favoriler"?<Heart/>:slug==="rehber"?<BookOpen/>:<Sparkles/>;
  return <main className="min-h-screen bg-[#fbfbfa]"><Header/><section className="bg-[var(--teal)] py-24 text-white"><div className="container-shell"><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--sun)]">{icon}</span><p className="eyebrow mt-7 !text-[var(--sun)]">{item.eyebrow}</p><h1 className="mt-3 max-w-3xl text-[clamp(42px,6vw,72px)] font-extrabold leading-[1.02] tracking-[-.065em]">{item.title}</h1><p className="mt-5 max-w-xl text-base leading-8 text-white/60">{item.copy}</p></div></section><section className="section-space"><div className="container-shell"><div className="section-head"><div><span className="eyebrow">DEMO İÇERİK</span><h2 className="section-title">Sizin için seçtiklerimiz</h2></div><Link href="/villalar" className="text-link">Tümünü keşfet <ArrowRight size={16}/></Link></div><div className="grid gap-6 md:grid-cols-3">{villas.slice(0,3).map(v=><VillaCard key={v.id} villa={v}/>)}</div></div></section></main>;
}
