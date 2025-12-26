"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface FolderProps {
  name: string;
  coverImage?: string;
  peekImage?: string;
  href: string;
}

export default function Folder({ name, coverImage, peekImage, href }: FolderProps) {
  // Default placeholders if no images are uploaded yet
  // Using reliable gradients or abstract patterns instead of potentially dead links
  const cover = coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"; // Abstract dark
  const peek = peekImage || "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"; // Abstract texture

  return (
    <Link href={href} className="block group relative w-full aspect-[4/3] cursor-pointer perspective-1000">
      
      {/* Container for the 3D effect */}
      <div className="relative w-full h-full preserve-3d transition-transform duration-500">
        
        {/* Sneak Peek Image (The one underneath) */}
        <motion.div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-white/5"
          initial={{ rotate: 0, scale: 0.95, y: 0 }}
          whileHover={{ rotate: 5, scale: 0.98, x: 20 }} // Shifts right and rotates slightly
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image 
            src={peek} 
            alt={`${name} sneak peek`} 
            fill 
            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Dim overlay */}
        </motion.div>

        {/* Cover Image (The top "Folder" face) */}
        <motion.div 
          className="absolute inset-0 rounded-xl overflow-hidden shadow-xl border border-white/10 z-10 bg-gray-800"
          initial={{ rotateY: 0, x: 0 }}
          whileHover={{ 
            rotateY: -15, // Tilts open like a book/folder
            x: -20,       // Slides left
            scale: 1.02
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Image 
            src={cover} 
            alt={name} 
            fill 
            className="object-cover" 
          />
          
          {/* Label Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/0 transition-colors">
            <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-pastel-sage tracking-widest uppercase drop-shadow-lg group-hover:scale-110 transition-all duration-300">
              {name}
            </h3>
          </div>
        </motion.div>
        
      </div>
    </Link>
  );
}
