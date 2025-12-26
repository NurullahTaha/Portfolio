import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PhotoGrid from "@/app/components/PhotoGrid";

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      photos: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!category) {
    // Demo fallback if DB is empty/category missing
    if (['nature', 'city', 'automobile'].includes(params.slug)) {
       return (
         <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold capitalize text-white mb-4">{params.slug}</h1>
            <p className="text-gray-400">Category exists in demo mode. No photos yet.</p>
         </div>
       )
    }
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-5xl font-bold text-white capitalize">{category.name}</h1>
          <p className="text-gray-400 mt-2">{category.photos.length} Photos</p>
        </div>
      </div>

      {/* Interactive Photo Grid */}
      <PhotoGrid photos={category.photos} />
    </div>
  );
}
