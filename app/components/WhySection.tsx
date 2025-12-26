"use client";

import { motion } from "framer-motion";
import { Aperture, Heart, Zap, Globe } from "lucide-react";

export default function WhySection() {
  const features = [
    {
      icon: <Aperture className="w-6 h-6" />,
      title: "The Obsession",
      text: "It started as a hobby, documenting travels. It quickly became an obsession. The thrill of chasing light, the patience for wildlife, the geometry of cities—it all speaks to me."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "My Perspective",
      text: "Photography forces me to slow down. In a fast-paced world, my camera is my anchor, allowing me to share a unique, frozen perspective with the world."
    }
  ];

  return (
    <section className="relative py-12">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-pastel-sage/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-pastel-sage/50" />
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Why I Do It</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-pastel-sage/50" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-pastel-sage/50 transition-all group"
            >
              <div className="w-12 h-12 bg-pastel-black rounded-xl flex items-center justify-center text-pastel-sage mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pastel-sage/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pastel-sage transition-colors">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
