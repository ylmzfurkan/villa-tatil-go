import VillaDetailPage from "../../../components/villa-detail-page";
import { villas } from "../../../lib/data";

export function generateStaticParams() {
  return villas.map((villa) => ({ slug: villa.slug }));
}

export default async function VillaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <VillaDetailPage slug={slug} />;
}
