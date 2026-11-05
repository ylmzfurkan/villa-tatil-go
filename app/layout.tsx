import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VillaTatilGo | Kaş'ta Villa Tatilinin Yeni Adresi",
  description: "Kaş ve çevresindeki seçkin kiralık villaları keşfedin, müsaitlik ve fiyat bilgisi alın.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
