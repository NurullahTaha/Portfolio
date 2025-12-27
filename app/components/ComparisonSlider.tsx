"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function ComparisonSlider({ beforeImage, afterImage }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const pageX = 'touches' in event ? event.touches[0].pageX : (event as MouseEvent).pageX;
    const position = ((pageX - left) / width) * 100;

    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  useEffect(() => {
    const stopDragging = () => (isDragging.current = false);
    
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <div 
        ref={containerRef}
        className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden cursor-ew-resize select-none touch-none"
        onMouseDown={() => (isDragging.current = true)}
        onTouchStart={() => (isDragging.current = true)}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt="After" 
        fill 
        className="object-cover"
        priority
      />
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">AFTER</div>

      {/* Before Image (Clipped on top) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <Image 
            src={beforeImage} 
            alt="Before" 
            fill 
            className="object-cover object-left" 
            priority
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">BEFORE</div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-pastel-black">
            <MoveHorizontal className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
