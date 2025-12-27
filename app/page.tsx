import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import WhySection from "@/app/components/WhySection"; // New Component

// Placeholder component for when no photos exist
function EmptyState() {
  return (
    <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10 relative overflow-hidden group">
      <div className="absolute inset-0 bg-pastel-sage/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-xl font-medium text-pastel-sage mb-2 relative z-10">No favorites selected</h3>
      <p className="text-gray-400 mb-6 relative z-10">Go to the Admin panel to mark your best shots as "Favorite".</p>
    </div>
  );
}

export default async function Home() {
  // Fetch favorite photos
  const perfectPhotos = await prisma.photo.findMany({ 
    where: { isFavorite: true }, 
    take: 3,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-32">
      
      {/* Hero / Bio Section */}
      <section className="flex flex-col md:flex-row gap-16 items-center min-h-[70vh]">
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
            Capturing <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-sage to-white">The Moment</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-lg border-l-2 border-pastel-sage/30 pl-6">
            Hi, I'm a photographer who sees the world through a lens. 
            Freezing time, telling stories without words, and finding beauty in the chaos.
          </p>
          <div className="pt-4 flex gap-4">
             <Link href="/gallery" className="px-8 py-4 bg-pastel-sage text-black font-bold rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(130,166,156,0.3)]">
               View My Work
             </Link>
             <Link href="/gear" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all">
               My Gear
             </Link>
          </div>
        </div>
        
        {/* Stylish Hero Image */}
        <div className="md:w-1/2 relative group">
             <div className="absolute -inset-4 bg-pastel-sage/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
             <div className="aspect-[4/5] bg-gray-900 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <Image 
                    src="/hero.jpg" 
                    alt="Hero Portfolio Shot" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 flex items-center justify-center">

                </div>
             </div> 
        </div>
      </section>

      {/* Why I Do It (New Animated Component) */}
      <WhySection />

      {/* Perfect Photos Showcase */}
      <section className="relative">
        <div className="flex justify-between items-end mb-12">
           <div>
               <h2 className="text-3xl font-bold text-white mb-2">Perfect Shots</h2>
               <div className="h-1 w-20 bg-pastel-sage rounded-full" />
           </div>
           <Link href="/gallery" className="text-gray-400 hover:text-pastel-sage transition-colors text-sm font-medium tracking-wide flex items-center gap-2">
             View All Gallery <span className="text-lg">&rarr;</span>
           </Link>
        </div>
        
        {perfectPhotos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {perfectPhotos.map((photo) => (
               <div key={photo.id} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 group cursor-pointer shadow-lg hover:shadow-pastel-sage/20 transition-all hover:-translate-y-2">
                 <Image 
                    src={photo.url} 
                    alt={photo.title || "Portfolio photo"} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                 
                 <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-bold text-xl text-white mb-1">{photo.title}</p>
                    <div className="h-0.5 w-0 group-hover:w-full bg-pastel-sage transition-all duration-500 delay-100" />
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

    </div>
  );
}