import { prisma } from "@/lib/prisma";
import Folder from "@/app/components/Folder";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Portfolio",
  description: "Browse my photography collections.",
};

export default async function GalleryPage() {
  // Fetch categories from DB with latest 2 photos
  let categories = await prisma.category.findMany({
    include: {
      photos: {
        take: 2,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  // Fallback if DB is empty (for immediate demo)
  if (categories.length === 0) {
    categories = [
      { id: '1', name: 'Nature', slug: 'nature', photos: [] },
      { id: '2', name: 'City', slug: 'city', photos: [] },
      { id: '3', name: 'Automobile', slug: 'automobile', photos: [] },
    ] as any;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-12 border-b border-white/10 pb-4">
        Collections
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {categories.map((cat) => {
          // Dynamic logic: First photo is cover, second is sneak peek
          const cover = cat.photos[0]?.url;
          const peek = cat.photos[1]?.url;

          return (
             <Folder 
               key={cat.id}
               name={cat.name}
               href={`/gallery/${cat.slug}`}
               coverImage={cover}
               peekImage={peek}
             />
          );
        })}
      </div>
    </div>
  );
}
