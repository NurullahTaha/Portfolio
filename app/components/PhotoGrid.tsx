"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Maximize2 } from "lucide-react";
import { deletePhoto } from "@/app/actions/deletePhoto";

interface Photo {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
}

interface PhotoGridProps {
  photos: Photo[];
  isAdmin?: boolean;
}

export default function PhotoGrid({ photos, isAdmin = false }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation(); // Prevent opening the modal
    if (!confirm("Are you sure you want to delete this photo?")) return;

    setIsDeleting(true);
    const result = await deletePhoto(photo.id, photo.url);
    setIsDeleting(false);

    if (result.success) {
       // Close modal if open (though we stopped propogation, good safety)
       setSelectedPhoto(null);
       // The page will automatically refresh due to revalidatePath in the action
    } else {
        alert("Failed to delete photo.");
    }
  };

  return (
    <>
      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <motion.div 
            key={photo.id} 
            layoutId={`photo-${photo.id}`}
            className="relative group aspect-[4/5] overflow-hidden rounded-lg bg-gray-900 border border-white/5 cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
             <Image 
               src={photo.url} 
               alt={photo.title || "Photo"} 
               fill 
               className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
             
             {/* Hover Overlay */}
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                {/* <p className="text-white font-medium">{photo.title}</p> Removed title display */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-8 h-8" />
                </div>
             </div>

             {/* Admin Delete Button (Directly on grid too for speed) */}
             {isAdmin && (
                <button
                    onClick={(e) => handleDelete(e, photo)}
                    disabled={isDeleting}
                    className="absolute top-2 left-2 p-2 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                    title="Delete Photo"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
             )}
          </motion.div>
        ))}
      </div>

      {/* The Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setSelectedPhoto(null)} // Close on background click
          >
            {/* Close Button */}
            <button 
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-50"
                onClick={() => setSelectedPhoto(null)}
            >
                <X className="w-8 h-8" />
            </button>

            {/* The Image Container */}
            <motion.div 
                layoutId={`photo-${selectedPhoto.id}`}
                className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Don't close when clicking image itself
            >
                {/* We use standard img here for natural aspect ratio preservation without layout shift issues of 'fill' in flex containers */}
                <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title || "Full size"}
                    className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
                />

                {/* Admin Delete inside Modal */}
                {isAdmin && (
                    <div className="absolute bottom-4 right-4 pointer-events-auto">
                        <button
                            onClick={(e) => handleDelete(e, selectedPhoto)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete Photo</span>
                        </button>
                    </div>
                )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
