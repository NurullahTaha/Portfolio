"use client";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComparisonSlider from "./ComparisonSlider";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageAfter: string;
  imageBefore?: string | null;
  category: string;
  description?: string | null;
}

export default function ProductCard({ id, name, price, imageAfter, imageBefore, category, description }: ProductProps) {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-pastel-sage/50 transition-all cursor-pointer"
      >
        <div className="relative aspect-square">
          <Image 
              src={imageAfter} 
              alt={name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white uppercase tracking-wider">
              {category}
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
              <div>
                  <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
                  <p className="text-pastel-sage font-mono">${(price / 100).toFixed(2)}</p>
              </div>
          </div>

          <button 
              onClick={(e) => {
                  e.stopPropagation();
                  addToCart({ id, name, price, imageUrl: imageAfter });
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-lg hover:bg-pastel-sage transition-colors"
          >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
          </button>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={() => setIsOpen(false)}
            >
                <div 
                    className="bg-pastel-black border border-white/10 rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Left: Image / Slider */}
                    <div className="w-full md:w-2/3 bg-gray-900 p-4 flex items-center justify-center">
                        {imageBefore ? (
                            <ComparisonSlider beforeImage={imageBefore} afterImage={imageAfter} />
                        ) : (
                            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden">
                                <Image src={imageAfter} alt={name} fill className="object-contain" />
                            </div>
                        )}
                    </div>

                    {/* Right: Info */}
                    <div className="w-full md:w-1/3 p-8 flex flex-col">
                        <div className="mb-auto">
                            <span className="text-pastel-sage text-xs font-bold uppercase tracking-widest">{category}</span>
                            <h2 className="text-3xl font-bold text-white mt-2 mb-4">{name}</h2>
                            <p className="text-gray-400 leading-relaxed mb-6">{description || "No description available."}</p>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-3xl font-mono text-white">${(price / 100).toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                addToCart({ id, name, price, imageUrl: imageAfter });
                                setIsOpen(false);
                            }}
                            className="w-full py-4 bg-pastel-sage text-black font-bold text-lg rounded-xl hover:bg-white transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
