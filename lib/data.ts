export type Villa = {
  id: number;
  slug: string;
  name: string;
  location: string;
  category: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  tags: string[];
  featured?: boolean;
  discount?: string;
};

export const villas: Villa[] = [
  {
    id: 1,
    slug: "villa-mare",
    name: "Villa Mare",
    location: "Kaş · Çukurbağ Yarımadası",
    category: "Deniz Manzaralı",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    price: 12800,
    oldPrice: 14500,
    rating: 4.9,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=88",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=86",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=86",
    ],
    tags: ["Sonsuzluk havuzu", "Denize 500 m", "Jakuzi"],
    featured: true,
    discount: "%12 fırsat",
  },
  {
    id: 2,
    slug: "villa-likya",
    name: "Villa Likya",
    location: "Kaş · Kalkan · Kördere",
    category: "Balayı",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 8900,
    rating: 4.8,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=88",
    gallery: [],
    tags: ["Korunaklı havuz", "Jakuzi", "Gün batımı"],
    featured: true,
  },
  {
    id: 3,
    slug: "villa-begonvil",
    name: "Villa Begonvil",
    location: "Kaş · İslamlar",
    category: "Muhafazakâr",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    price: 10600,
    oldPrice: 11900,
    rating: 4.9,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1600&q=88",
    gallery: [],
    tags: ["Tam korunaklı", "Geniş bahçe", "Çocuk havuzu"],
    featured: true,
    discount: "Son 2 tarih",
  },
  {
    id: 4,
    slug: "villa-antik",
    name: "Villa Antik",
    location: "Kaş · Patara",
    category: "Aile",
    guests: 10,
    bedrooms: 5,
    bathrooms: 5,
    price: 15400,
    rating: 4.7,
    reviews: 9,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=88",
    gallery: [],
    tags: ["Çocuk dostu", "Oyun alanı", "Barbekü"],
  },
  {
    id: 5,
    slug: "villa-turkuaz",
    name: "Villa Turkuaz",
    location: "Kaş · Kalkan · Kalamar",
    category: "Lüks",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    price: 18200,
    rating: 5,
    reviews: 7,
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=88",
    gallery: [],
    tags: ["Deniz manzarası", "Sauna", "Sinema odası"],
    discount: "Yeni",
  },
  {
    id: 6,
    slug: "villa-zeytin",
    name: "Villa Zeytin",
    location: "Kaş · Sarıbelen",
    category: "Doğa",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    price: 7200,
    rating: 4.8,
    reviews: 16,
    image: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1600&q=88",
    gallery: [],
    tags: ["Doğa içinde", "Isıtmalı havuz", "Şömine"],
  },
];

export const reservations = [
  { id: "VTG-1048", guest: "Ayşe Demir", villa: "Villa Mare", dates: "14–19 Tem", total: "₺64.000", status: "Ödeme bekleniyor", tone: "amber" },
  { id: "VTG-1047", guest: "Mert Kaya", villa: "Villa Likya", dates: "08–12 Tem", total: "₺35.600", status: "Onaylandı", tone: "green" },
  { id: "VTG-1046", guest: "Elif Aydın", villa: "Villa Begonvil", dates: "21–27 Tem", total: "₺63.600", status: "Yeni talep", tone: "blue" },
  { id: "VTG-1045", guest: "Can Koç", villa: "Villa Antik", dates: "03–09 Ağu", total: "₺92.400", status: "Ön rezervasyon", tone: "purple" },
];

export const leads = [
  { name: "Elif Aydın", villa: "Villa Begonvil", detail: "Tarih ve fiyat seçti, WhatsApp'a yönlendirildi", time: "4 dk", hot: true },
  { name: "Burak Şen", villa: "Villa Mare", detail: "İletişim formunu tamamlamadan ayrıldı", time: "18 dk", hot: false },
  { name: "Seda Kılıç", villa: "Villa Likya", detail: "Telefonunu bıraktı, dönüş bekliyor", time: "31 dk", hot: true },
];
