"use client";

import { motion } from "framer-motion";
import { Camera, Eye, Sparkles } from "lucide-react";
import React from 'react';

export default function WhySection() {
  const features = [
    {
      icon: <Camera className="w-8 h-8 stroke-[1.5]" />,
      title: "The Obsession",
      text: "What started as a hobby to document my travels quickly became an obsession—chasing light, waiting for the perfect moment, finding geometry in cityscapes."
    },
    {
      icon: <Eye className="w-8 h-8 stroke-[1.5]" />,
      title: "My Perspective",
      text: "Photography forces me to slow down and observe. In a fast-paced world, my camera is my anchor, allowing me to share my unique, frozen perspective with the world."
    }
  ];

  return (
    <section className="relative py-24">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[300px] bg-pastel-sage/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why I Do This</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">It's more than just taking pictures; it's a way of seeing.</p>
        </div>

        {/* Unified Glass Panel */}
        <div className="relative p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-lg shadow-2xl">
            {/* Interactive Spotlight Effect */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: "radial-gradient(400px at 50% 50%, rgba(130, 166, 156, 0.15), transparent 80%)"
                }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                onMouseMove={(e) => {
                    e.currentTarget.style.background = `radial-gradient(400px at ${e.clientX - e.currentTarget.getBoundingClientRect().left}px ${e.clientY - e.currentTarget.getBoundingClientRect().top}px, rgba(130, 166, 156, 0.15), transparent 80%)`;
                }}
            />

            <div className="grid md:grid-cols-2 gap-16 relative">
              {features.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="text-pastel-sage mb-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(130,166,156,0.5)]">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 w-px bg-gradient-to-b from-transparent via-pastel-sage/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}