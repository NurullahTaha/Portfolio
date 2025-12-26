"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("portfolio-cookie-consent");
    if (!consent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("portfolio-cookie-consent", "all");
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem("portfolio-cookie-consent", "necessary");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 p-6 bg-pastel-black/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-pastel-blue/10 rounded-full text-pastel-blue">
              <Cookie className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Cookies & Privacy</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                We use cookies to ensure the site functions correctly. "Necessary" cookies are required for login.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2 bg-pastel-blue text-pastel-black font-bold text-sm rounded-lg hover:bg-white transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={acceptNecessary}
                  className="px-4 py-2 bg-white/5 text-gray-300 font-medium text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap"
                >
                  Necessary Only
                </button>
              </div>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
