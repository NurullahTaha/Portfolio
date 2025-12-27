import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UploadZone from "@/app/components/UploadZone";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import PhotoGrid from "@/app/components/PhotoGrid";

export const dynamic = "force-dynamic";

export default async function AdminCategoryPage(props: { params: Promise<{ slug: string }> }) {
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
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <Link href="/admin/gallery" className="flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition-colors w-fit">
             <ArrowLeft className="w-4 h-4" />
             Back to Collections
          </Link>
          <h1 className="text-5xl font-bold text-white capitalize">{category.name} <span className="text-pastel-blue text-2xl align-middle">(Admin Mode)</span></h1>
          <p className="text-gray-400 mt-2">{category.photos.length} Photos</p>
        </div>
        
        <Link 
            href={`/gallery/${params.slug}`} 
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
            <Eye className="w-4 h-4" />
            View Public Page
        </Link>
      </div>

      {/* ADMIN TOOL: Upload Zone */}
      <div className="bg-pastel-black border-2 border-dashed border-pastel-blue/30 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 bg-pastel-blue/10 rounded-bl-2xl">
            <span className="text-pastel-blue font-bold text-xs uppercase tracking-widest">Upload Zone</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-6">Add New Photos</h3>
        <UploadZone categoryId={category.id} />
      </div>

      {/* Photo Grid (To review what you have) */}
      <h3 className="text-2xl font-bold text-white mt-12">Current Photos</h3>
      <PhotoGrid photos={category.photos} isAdmin={true} />
    </div>
  );
}
