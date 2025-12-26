import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import UploadZone from "@/app/components/UploadZone";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function AdminUploadPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload to {category.name}</h1>
        <p className="text-gray-400 mb-8">Drag and drop your photos below.</p>
        
        <UploadZone categoryId={category.id} />
      </div>
    </div>
  );
}
