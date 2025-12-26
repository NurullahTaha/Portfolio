import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Folder, LogOut } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Portfolio",
};

export default async function AdminPage() {
  const session = await auth();
  
  // 1. Strict Security Check: If not logged in, kick them out.
  if (!session?.user) {
    redirect("/login");
  }

  const categories = await prisma.category.findMany({
    include: { _count: { select: { photos: true } } }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your portfolio content.</p>
        </div>
        <Link 
          href="/api/auth/signout" 
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Link>
      </div>

      <h2 className="text-xl font-bold text-pastel-sage mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
            href="/admin/gallery"
            className="group block p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-pastel-sage transition-all"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-pastel-black rounded-xl text-pastel-sage group-hover:scale-110 transition-transform">
                    <Folder className="w-10 h-10" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-pastel-sage transition-colors">Manage Gallery</h3>
                    <p className="text-gray-400">Upload photos, view folders.</p>
                </div>
            </div>
        </Link>
        
        {/* Manage Gear Link */}
        <Link 
            href="/admin/gear"
            className="group block p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-pastel-sage transition-all"
        >
             <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-pastel-black rounded-xl text-gray-400 group-hover:text-pastel-sage group-hover:scale-110 transition-all">
                    <Folder className="w-10 h-10" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-pastel-sage transition-colors">Manage Gear</h3>
                    <p className="text-gray-400">Add/Remove cameras & lenses.</p>
                </div>
            </div>
        </Link>
      </div>
    </div>
  );
}
