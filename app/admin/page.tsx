"use client";

import {
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Eye,
  Filter,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Logo } from "../../components/logo";
import {
  leads as baseLeads,
  reservations as initialReservations,
  villas,
} from "../../lib/data";

type View =
  "dashboard" | "villas" | "calendar" | "reservations" | "leads" | "settings";
const nav = [
  ["dashboard", "Genel Bakış", LayoutDashboard],
  ["villas", "Villalar", Building2],
  ["calendar", "Takvim", CalendarDays],
  ["reservations", "Rezervasyonlar", CircleDollarSign],
  ["leads", "Müşteri Talepleri", Users],
  ["settings", "Ayarlar", Settings],
] as const;
const tone: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  purple: "bg-violet-50 text-violet-700",
};

export default function AdminPage() {
  const [view, setView] = useState<View>("dashboard");
  const [side, setSide] = useState(false);
  const [newVilla, setNewVilla] = useState(false);
  const [newReservation, setNewReservation] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [villaRows, setVillaRows] = useState<any[]>(() =>
    villas.map((villa, index) => ({
      ...villa,
      adminStatus: index === villas.length - 1 ? "Taslak" : "Yayında",
    })),
  );
  const [reservations, setReservations] = useState(initialReservations);
  const [processed, setProcessed] = useState<string[]>([]);
  const [demoLead, setDemoLead] = useState<any>(null);
  useEffect(() => {
    try {
      const v = localStorage.getItem("vtg-demo-lead");
      if (v) setDemoLead(JSON.parse(v));
    } catch {}
  }, []);
  const allLeads = useMemo(() => {
    const rows = demoLead
      ? [
          {
            name: demoLead.name || "Yeni ziyaretçi",
            villa: demoLead.villa || "Villa Mare",
            detail: "Rezervasyon formunu tamamladı, WhatsApp'a yönlendirildi",
            time: "şimdi",
            hot: true,
          },
          ...baseLeads,
        ]
      : baseLeads;
    return rows.map((lead) =>
      processed.includes(lead.name)
        ? { ...lead, hot: false, detail: "Firma tarafından işleme alındı" }
        : lead,
    );
  }, [demoLead, processed]);
  const changeStatus = (id: string, status: string) =>
    setReservations((rows) =>
      rows.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              tone:
                status === "Onaylandı"
                  ? "green"
                  : status === "İptal edildi"
                    ? "blue"
                    : "amber",
            }
          : r,
      ),
    );
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };
  const addVilla = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "Yeni Villa");
    const location = String(data.get("location") || "Kaş");
    const price = Number(data.get("price") || 8500);
    setVillaRows((rows) => [
      {
        ...villas[0],
        id: Date.now(),
        slug: name.toLocaleLowerCase("tr").replaceAll(" ", "-"),
        name,
        location: `Kaş · ${location}`,
        price,
        guests: Number(data.get("guests") || 4),
        featured: false,
        adminStatus: "Taslak",
      },
      ...rows,
    ]);
    setNewVilla(false);
    notify(`${name} taslak olarak eklendi.`);
  };
  const addReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guest = String(data.get("guest") || "Yeni misafir");
    setReservations((rows) => [
      {
        id: `VTG-${1049 + rows.length}`,
        guest,
        villa: String(data.get("villa") || villas[0].name),
        dates: String(data.get("dates") || "Tarih bekleniyor"),
        total: String(data.get("total") || "₺0"),
        status: "Yeni talep",
        tone: "blue",
      },
      ...rows,
    ]);
    setNewReservation(false);
    notify(`${guest} için rezervasyon talebi eklendi.`);
  };

  return (
    <main className="min-h-screen bg-[#f5f7f6] text-[#17302e]">
      <aside
        className={`${side ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#082f2c] px-4 py-5 text-white transition lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-2">
          <Logo light />
          <button onClick={() => setSide(false)} className="lg:hidden">
            <X />
          </button>
        </div>
        <p className="mb-3 mt-9 px-4 text-[9px] font-extrabold uppercase tracking-[.18em] text-white/35">
          Yönetim
        </p>
        <nav className="space-y-1">
          {nav.map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => {
                setView(key);
                setSide(false);
              }}
              className={`${view === key ? "bg-white text-[var(--teal)] shadow-lg" : "text-white/62 hover:bg-white/8 hover:text-white"} flex w-full items-center gap-3 rounded-[14px] px-4 py-3 text-left text-[13px] font-bold transition`}
            >
              <Icon size={18} />
              <span>{label}</span>
              {key === "leads" && (
                <span className="ml-auto rounded-full bg-[var(--coral)] px-2 py-0.5 text-[9px] text-white">
                  {allLeads.filter((x) => x.hot).length}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="mb-3 rounded-2xl bg-white/7 p-4">
            <p className="text-[10px] font-bold text-white/40">DEMO HESABI</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--coral)] text-xs font-extrabold">
                FY
              </span>
              <div>
                <b className="block text-xs">Firma Yöneticisi</b>
                <span className="text-[10px] text-white/40">
                  admin@demo.test
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => notify("Demo sürümünde oturum açık bırakıldı.")}
            className="flex w-full items-center gap-3 px-4 py-3 text-xs font-bold text-white/50"
          >
            <LogOut size={17} /> Çıkış yap
          </button>
        </div>
      </aside>
      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSide(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 lg:hidden"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                VillaTatilGo Yönetim
              </p>
              <h1 className="text-lg font-extrabold">
                {nav.find((x) => x[0] === view)?.[1]}
              </h1>
            </div>
          </div>
          <div className="relative flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 sm:flex"
            >
              <Eye size={15} /> Siteyi görüntüle
            </Link>
            <button
              onClick={() => setNotificationsOpen((value) => !value)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white"
            >
              <Bell size={17} />
              <i className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[var(--coral)] ring-2 ring-white" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
                <div className="flex items-center justify-between">
                  <b className="text-sm">Bildirimler</b>
                  <button onClick={() => setNotificationsOpen(false)}>
                    <X size={15} />
                  </button>
                </div>
                <div className="mt-3 space-y-2 text-[11px]">
                  <button
                    onClick={() => {
                      setView("leads");
                      setNotificationsOpen(false);
                    }}
                    className="w-full rounded-xl bg-rose-50 p-3 text-left"
                  >
                    <b className="block text-rose-700">3 sıcak müşteri</b>
                    <span className="text-slate-500">
                      Takip bekleyen talepleri görüntüleyin.
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setView("reservations");
                      setNotificationsOpen(false);
                    }}
                    className="w-full rounded-xl bg-slate-50 p-3 text-left"
                  >
                    <b className="block">Ödeme bekleyen rezervasyon</b>
                    <span className="text-slate-500">
                      VTG-1048 için ödeme teyidi bekleniyor.
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        <div className="p-5 md:p-8">
          {view === "dashboard" && (
            <Dashboard
              leads={allLeads}
              reservations={reservations}
              setView={setView}
              onNewReservation={() => setNewReservation(true)}
              notify={notify}
            />
          )}
          {view === "villas" && (
            <VillasView
              rows={villaRows}
              onNew={() => setNewVilla(true)}
              notify={notify}
            />
          )}
          {view === "calendar" && <CalendarView notify={notify} />}
          {view === "reservations" && (
            <ReservationsView
              rows={reservations}
              changeStatus={changeStatus}
              onNew={() => setNewReservation(true)}
              notify={notify}
            />
          )}
          {view === "leads" && (
            <LeadsView
              rows={allLeads}
              onProcess={(name) => {
                setProcessed((rows) => [...rows, name]);
                notify(`${name} işleme alındı.`);
              }}
              notify={notify}
            />
          )}
          {view === "settings" && <SettingsView notify={notify} />}
        </div>
      </div>
      {side && (
        <button
          onClick={() => setSide(false)}
          className="fixed inset-0 z-40 bg-black/35 lg:hidden"
        />
      )}
      {newVilla && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4">
          <form
            onSubmit={addVilla}
            className="w-full max-w-2xl rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[var(--coral)]">
                  YENİ KAYIT
                </span>
                <h2 className="text-2xl font-extrabold">Villa ekle</h2>
              </div>
              <button
                type="button"
                onClick={() => setNewVilla(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="form-label sm:col-span-2">
                Villa adı
                <input name="name" required placeholder="Örn. Villa Akdeniz" />
              </label>
              <label className="form-label">
                Bölge
                <select name="location">
                  <option>Kaş</option>
                  <option>Kalkan</option>
                </select>
              </label>
              <label className="form-label">
                Kapasite
                <input name="guests" type="number" min="2" defaultValue="4" />
              </label>
              <label className="form-label">
                Başlangıç fiyatı
                <input
                  name="price"
                  type="number"
                  min="1000"
                  required
                  placeholder="₺"
                />
              </label>
              <label className="form-label">
                Yayın durumu
                <select>
                  <option>Taslak</option>
                  <option>Yayında</option>
                </select>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setNewVilla(false)}
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-bold"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="rounded-full bg-[var(--teal)] px-6 py-3 text-xs font-bold text-white"
              >
                Taslak oluştur
              </button>
            </div>
          </form>
        </div>
      )}
      {newReservation && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4">
          <form
            onSubmit={addReservation}
            className="w-full max-w-xl rounded-[28px] bg-white p-7 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[var(--coral)]">
                  MANUEL KAYIT
                </span>
                <h2 className="text-2xl font-extrabold">Rezervasyon ekle</h2>
              </div>
              <button
                type="button"
                onClick={() => setNewReservation(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="form-label sm:col-span-2">
                Misafir adı
                <input name="guest" required placeholder="Ad soyad" />
              </label>
              <label className="form-label">
                Villa
                <select name="villa">
                  {villaRows.map((villa) => (
                    <option key={villa.id}>{villa.name}</option>
                  ))}
                </select>
              </label>
              <label className="form-label">
                Tarih aralığı
                <input name="dates" required placeholder="14–19 Tem" />
              </label>
              <label className="form-label sm:col-span-2">
                Toplam tutar
                <input name="total" required placeholder="₺64.000" />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setNewReservation(false)}
                className="rounded-full border border-slate-200 px-5 py-3 text-xs font-bold"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="rounded-full bg-[var(--coral)] px-6 py-3 text-xs font-bold text-white"
              >
                Talebi oluştur
              </button>
            </div>
          </form>
        </div>
      )}
      {notice && (
        <div className="fixed bottom-6 right-6 z-[90] max-w-sm rounded-2xl bg-[#082f2c] px-5 py-4 text-sm font-bold text-white shadow-2xl">
          <Check size={16} className="mr-2 inline text-emerald-300" />
          {notice}
        </div>
      )}
    </main>
  );
}

function Dashboard({
  leads,
  reservations,
  setView,
  onNewReservation,
  notify,
}: {
  leads: any[];
  reservations: any[];
  setView: (v: View) => void;
  onNewReservation: () => void;
  notify: (message: string) => void;
}) {
  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold tracking-[-.04em]">
            Günaydın 👋
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Bugün takip etmeniz gereken 3 sıcak müşteri var.
          </p>
        </div>
        <button
          onClick={onNewReservation}
          className="rounded-full bg-[var(--coral)] px-5 py-3 text-xs font-extrabold text-white"
        >
          + Yeni rezervasyon
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Yeni talepler", "12", "+18%", Users, "coral"],
          ["Onaylı rezervasyon", "28", "+6%", CalendarDays, "green"],
          ["Aylık tahmini ciro", "₺418K", "+12%", CircleDollarSign, "blue"],
          ["Doluluk oranı", "%76", "+4.2%", TrendingUp, "purple"],
        ].map(([label, value, change, Icon, color]: any) => (
          <div key={label} className="admin-card p-5">
            <div className="flex items-start justify-between">
              <span className={`admin-stat-icon ${color}`}>
                <Icon size={19} />
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                {change}
              </span>
            </div>
            <strong className="mt-6 block text-2xl font-extrabold tracking-[-.04em]">
              {value}
            </strong>
            <span className="mt-1 block text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="admin-title">Rezervasyon performansı</h3>
              <p className="text-xs text-slate-400">Son 8 ay · örnek veri</p>
            </div>
            <select
              onChange={(event) =>
                notify(`${event.target.value} performansı gösteriliyor.`)
              }
              className="rounded-full border border-slate-200 px-3 py-2 text-[10px] font-bold outline-none"
            >
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
          <div className="mt-8 flex h-52 items-end gap-3">
            {[36, 48, 44, 65, 58, 78, 69, 86].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative h-[180px] w-full overflow-hidden rounded-t-lg bg-slate-50">
                  <i
                    className="absolute inset-x-0 bottom-0 rounded-t-lg bg-[linear-gradient(180deg,#e16543,#f4ae98)]"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-400">
                  {["Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="admin-card p-6">
          <div className="flex items-center justify-between">
            <h3 className="admin-title">Takip bekleyen talepler</h3>
            <button
              onClick={() => setView("leads")}
              className="text-[10px] font-bold text-[var(--coral)]"
            >
              Tümünü gör
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {leads.slice(0, 3).map((l) => (
              <div
                key={l.name}
                className="rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${l.hot ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"} grid h-9 w-9 place-items-center rounded-full text-xs font-extrabold`}
                  >
                    {l.name
                      .split(" ")
                      .map((x: string) => x[0])
                      .join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <b className="block truncate text-xs">{l.name}</b>
                    <span className="block truncate text-[10px] text-slate-400">
                      {l.villa}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400">{l.time}</span>
                </div>
                <p className="mt-3 text-[10px] leading-4 text-slate-500">
                  {l.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="admin-card mt-5 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h3 className="admin-title">Son rezervasyonlar</h3>
            <p className="text-xs text-slate-400">
              Güncel talepler ve ödeme durumu
            </p>
          </div>
          <button
            onClick={() => setView("reservations")}
            className="text-[10px] font-bold text-[var(--teal)]"
          >
            Tüm rezervasyonlar
          </button>
        </div>
        <ReservationTable rows={reservations} notify={notify} />
      </div>
    </>
  );
}

function VillasView({
  rows,
  onNew,
  notify,
}: {
  rows: any[];
  onNew: () => void;
  notify: (message: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [onlyPublished, setOnlyPublished] = useState(false);
  const visible = rows.filter(
    (villa, index) =>
      (villa.name + villa.location)
        .toLocaleLowerCase("tr")
        .includes(query.toLocaleLowerCase("tr")) &&
      (!onlyPublished || villa.adminStatus === "Yayında"),
  );
  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold">Villa portföyü</h2>
          <p className="mt-1 text-sm text-slate-500">
            Yayındaki ve taslak villaları yönetin.
          </p>
        </div>
        <button
          onClick={onNew}
          className="flex items-center gap-2 rounded-full bg-[var(--teal)] px-5 py-3 text-xs font-extrabold text-white"
        >
          <Plus size={16} /> Yeni villa ekle
        </button>
      </div>
      <div className="mb-5 flex gap-3">
        <div className="relative max-w-md flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-xs outline-none"
            placeholder="Villa ara"
          />
        </div>
        <button
          onClick={() => setOnlyPublished((value) => !value)}
          className={`${onlyPublished ? "border-[var(--teal)] bg-emerald-50 text-[var(--teal)]" : "border-slate-200 bg-white"} flex items-center gap-2 rounded-full border px-4 text-xs font-bold`}
        >
          <Filter size={14} /> {onlyPublished ? "Yayındakiler" : "Filtre"}
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((v, i) => (
          <div key={v.id} className="admin-card overflow-hidden">
            <div className="relative h-48">
              <img
                src={v.image}
                alt={v.name}
                className="h-full w-full object-cover"
              />
              <span
                className={`${v.adminStatus === "Taslak" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"} absolute left-4 top-4 rounded-full px-2.5 py-1 text-[9px] font-extrabold`}
              >
                {v.adminStatus}
              </span>
              <button
                onClick={() => notify(`${v.name} için hızlı işlemler açıldı.`)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90"
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex justify-between gap-3">
                <div>
                  <h3 className="font-extrabold">{v.name}</h3>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {v.location}
                  </p>
                </div>
                <b className="text-sm">₺{v.price.toLocaleString("tr-TR")}</b>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-[10px] text-slate-400">
                  {v.guests} kişi · {v.bedrooms} oda
                </span>
                <button
                  onClick={() =>
                    notify(`${v.name} düzenleme ekranı demo sürümünde hazır.`)
                  }
                  className="flex items-center gap-1.5 text-[10px] font-bold text-[var(--teal)]"
                >
                  <Pencil size={13} /> Düzenle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CalendarView({ notify }: { notify: (message: string) => void }) {
  const [monthOffset, setMonthOffset] = useState(0);
  const date = new Date(2027, 6 + monthOffset, 1);
  const title = date.toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });
  const dayCount = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
  const days = Array.from({ length: dayCount }, (_, i) => i + 1);
  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Merkezi takvim</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tüm villaların doluluk ve opsiyon durumları.
          </p>
        </div>
        <button
          onClick={() =>
            notify("Seçili tarihler kapalı olarak takvime işlendi (demo).")
          }
          className="rounded-full bg-[var(--teal)] px-5 py-3 text-xs font-bold text-white"
        >
          + Tarih kapat
        </button>
      </div>
      <div className="admin-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <button
            onClick={() => setMonthOffset((value) => value - 1)}
            className="text-xs font-bold"
          >
            ‹ Önceki
          </button>
          <h3 className="admin-title capitalize">{title}</h3>
          <button
            onClick={() => setMonthOffset((value) => value + 1)}
            className="text-xs font-bold"
          >
            Sonraki ›
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="flex border-b border-slate-100 bg-slate-50">
              {" "}
              <span className="w-[180px] shrink-0 p-3 text-[9px] font-bold text-slate-400">
                VİLLA
              </span>
              {days.map((d) => (
                <span
                  key={d}
                  className="w-8 shrink-0 border-l border-slate-100 py-3 text-center text-[9px] font-bold text-slate-400"
                >
                  {d}
                </span>
              ))}
            </div>
            {villas.slice(0, 5).map((v, row) => (
              <div key={v.id} className="flex border-b border-slate-50">
                <span className="w-[180px] shrink-0 truncate p-3 text-[10px] font-bold">
                  {v.name}
                </span>
                {days.map((d) => (
                  <span
                    key={d}
                    className="relative w-8 shrink-0 border-l border-slate-50 p-1"
                  >
                    {(d + row * 3) % 13 < 4 && (
                      <i
                        className={`${row % 3 === 0 ? "bg-rose-400" : row % 3 === 1 ? "bg-amber-400" : "bg-violet-400"} block h-6 rounded-sm opacity-80`}
                      />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5 p-5 text-[10px] text-slate-500">
          <span>
            <i className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-400" />
            Onaylı
          </span>
          <span>
            <i className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />
            Opsiyon
          </span>
          <span>
            <i className="mr-2 inline-block h-2 w-2 rounded-full bg-violet-400" />
            Kapalı
          </span>
        </div>
      </div>
    </>
  );
}

function ReservationsView({
  rows,
  changeStatus,
  onNew,
  notify,
}: {
  rows: any[];
  changeStatus: (id: string, status: string) => void;
  onNew: () => void;
  notify: (message: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Tümü");
  const visible = rows.filter(
    (row) =>
      (row.id + row.guest + row.villa)
        .toLocaleLowerCase("tr")
        .includes(query.toLocaleLowerCase("tr")) &&
      (status === "Tümü" || row.status === status),
  );
  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Rezervasyonlar</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tüm talepleri ve ödeme durumlarını takip edin.
          </p>
        </div>
        <button
          onClick={onNew}
          className="rounded-full bg-[var(--coral)] px-5 py-3 text-xs font-bold text-white"
        >
          + Manuel rezervasyon
        </button>
      </div>
      <div className="admin-card overflow-hidden">
        <div className="flex gap-3 border-b border-slate-100 p-5">
          <div className="relative max-w-sm flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={15}
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="İsim veya talep no ara"
              className="h-10 w-full rounded-full border border-slate-200 pl-9 pr-4 text-xs outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-full border border-slate-200 px-4 text-[10px] font-bold outline-none"
          >
            <option>Tümü</option>
            <option>Yeni talep</option>
            <option>Ön rezervasyon</option>
            <option>Ödeme bekleniyor</option>
            <option>Onaylandı</option>
            <option>İptal edildi</option>
          </select>
        </div>
        <ReservationTable
          rows={visible}
          changeStatus={changeStatus}
          notify={notify}
        />
      </div>
    </>
  );
}

function ReservationTable({
  rows,
  changeStatus,
  notify,
}: {
  rows: any[];
  changeStatus?: (id: string, status: string) => void;
  notify?: (message: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="bg-slate-50 text-[9px] uppercase tracking-wider text-slate-400">
            {["Talep", "Misafir", "Villa / Tarih", "Tutar", "Durum", ""].map(
              (x) => (
                <th key={x} className="px-6 py-3 font-bold">
                  {x}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 text-xs">
              <td className="px-6 py-4 font-extrabold text-[var(--teal)]">
                {r.id}
              </td>
              <td className="px-6 py-4 font-bold">{r.guest}</td>
              <td className="px-6 py-4">
                <b className="block text-[11px]">{r.villa}</b>
                <span className="text-[10px] text-slate-400">{r.dates}</span>
              </td>
              <td className="px-6 py-4 font-bold">{r.total}</td>
              <td className="px-6 py-4">
                {changeStatus ? (
                  <select
                    value={r.status}
                    onChange={(e) => changeStatus(r.id, e.target.value)}
                    className={`${tone[r.tone]} rounded-full border-0 px-3 py-1.5 text-[9px] font-extrabold outline-none`}
                  >
                    <option>Yeni talep</option>
                    <option>Ön rezervasyon</option>
                    <option>Ödeme bekleniyor</option>
                    <option>Onaylandı</option>
                    <option>İptal edildi</option>
                  </select>
                ) : (
                  <span
                    className={`${tone[r.tone]} rounded-full px-3 py-1.5 text-[9px] font-extrabold`}
                  >
                    {r.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() =>
                    notify?.(`${r.id} · ${r.guest} · ${r.villa} · ${r.dates}`)
                  }
                  aria-label={`${r.id} detayını göster`}
                >
                  <MoreHorizontal size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeadsView({
  rows,
  onProcess,
  notify,
}: {
  rows: any[];
  onProcess: (name: string) => void;
  notify: (message: string) => void;
}) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold">Müşteri talepleri</h2>
        <p className="mt-1 text-sm text-slate-500">
          Rezervasyon niyeti gösteren ziyaretçileri satışa dönüştürün.
        </p>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.4fr_.6fr]">
        <div className="space-y-3">
          {rows.map((l, i) => (
            <div
              key={i}
              className="admin-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
            >
              <span
                className={`${l.hot ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500"} grid h-12 w-12 shrink-0 place-items-center rounded-full text-xs font-extrabold`}
              >
                {l.name
                  .split(" ")
                  .map((x: string) => x[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold">{l.name}</h3>
                  {l.hot && (
                    <span className="rounded-full bg-rose-50 px-2 py-1 text-[8px] font-extrabold text-rose-600">
                      SICAK
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  <b>{l.villa}</b> · {l.detail}
                </p>
                <p className="mt-2 text-[9px] text-slate-400">{l.time} önce</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    notify(
                      `${l.name} için WhatsApp görüşmesi demo olarak hazırlandı.`,
                    )
                  }
                  aria-label={`${l.name} WhatsApp`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-[var(--teal)]"
                >
                  <MessageCircle size={17} />
                </button>
                <button
                  disabled={!l.hot}
                  onClick={() => onProcess(l.name)}
                  className="rounded-full bg-[var(--teal)] px-4 text-[10px] font-bold text-white disabled:bg-slate-200 disabled:text-slate-500"
                >
                  {l.hot ? "İşleme al" : "İşleme alındı"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="admin-card h-fit p-6">
          <Sparkles className="text-[var(--coral)]" />
          <h3 className="mt-4 text-lg font-extrabold">Talep hunisi</h3>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Son 30 gündeki demo müşteri yolculuğu.
          </p>
          <div className="mt-6 space-y-3">
            {[
              ["Villa görüntüleme", 1240, 100],
              ["Fiyat hesaplama", 486, 68],
              ["Form başlangıcı", 142, 44],
              ["Talep oluşturma", 68, 26],
            ].map(([x, n, w]: any) => (
              <div key={x}>
                <div className="mb-1 flex justify-between text-[10px]">
                  <span>{x}</span>
                  <b>{n}</b>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <i
                    className="block h-full rounded-full bg-[var(--coral)]"
                    style={{ width: `${w}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SettingsView({ notify }: { notify: (message: string) => void }) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold">Site ayarları</h2>
        <p className="mt-1 text-sm text-slate-500">
          Marka ve iletişim bilgilerini tek yerden yönetin.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="admin-card p-6">
          <h3 className="admin-title">Marka bilgileri</h3>
          <div className="mt-5 space-y-4">
            <label className="form-label">
              Site adı
              <input defaultValue="VillaTatilGo" />
            </label>
            <label className="form-label">
              Slogan
              <input defaultValue="Akdeniz'deki eviniz hazır." />
            </label>
            <label className="form-label">
              E-posta
              <input defaultValue="merhaba@villatatilgo.test" />
            </label>
            <label className="form-label">
              Telefon
              <input defaultValue="+90 555 000 00 00" />
            </label>
            <button
              onClick={() =>
                notify("Marka bilgileri tarayıcı demosuna kaydedildi.")
              }
              className="rounded-full bg-[var(--teal)] px-5 py-3 text-xs font-bold text-white"
            >
              Değişiklikleri kaydet
            </button>
          </div>
        </div>
        <div className="admin-card p-6">
          <h3 className="admin-title">Rezervasyon kuralları</h3>
          <div className="mt-5 space-y-4">
            <label className="form-label">
              Varsayılan ön rezervasyon süresi
              <select>
                <option>24 saat</option>
                <option>12 saat</option>
              </select>
            </label>
            <label className="form-label">
              Varsayılan giriş saati
              <input defaultValue="16:00" />
            </label>
            <label className="form-label">
              Varsayılan çıkış saati
              <input defaultValue="10:00" />
            </label>
            <label className="form-label">
              WhatsApp bildirim numarası
              <input defaultValue="+90 555 000 00 00" />
            </label>
            <button
              onClick={() => notify("Rezervasyon kuralları güncellendi.")}
              className="rounded-full bg-[var(--teal)] px-5 py-3 text-xs font-bold text-white"
            >
              Kuralları güncelle
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
