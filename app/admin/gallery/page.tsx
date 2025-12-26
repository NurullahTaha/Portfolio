import { prisma } from "@/lib/prisma";
import Folder from "@/app/components/Folder";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminGalleryPage() {
  const categories = await prisma.category.findMany({
    include: {
      photos: {
        take: 2,
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-white border-b border-white/10 pb-4">
            Manage Collections
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {categories.map((cat) => {
          // Dynamic logic: First photo is cover, second is sneak peek
          const cover = cat.photos[0]?.url;
          const peek = cat.photos[1]?.url;

          return (
             <Folder 
               key={cat.id}
               name={cat.name}
               // KEY CHANGE: This now points to the ADMIN version of the page
               href={`/admin/gallery/${cat.slug}`} 
               coverImage={cover}
               peekImage={peek}
             />
          );
        })}
      </div>
    </div>
  );
}
