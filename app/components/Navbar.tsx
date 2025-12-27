"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import clsx from "clsx";
import { useCart } from "@/app/context/CartContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Gear", href: "/gear" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pastel-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="relative w-16 h-16"> 
                <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill 
                    className="object-contain" 
                />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "text-pastel-sage bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Cart Button */}
            <button 
                onClick={toggleCart}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
            >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-pastel-sage text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cart.length}
                    </span>
                )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={toggleCart}
                className="relative p-2 text-gray-300 hover:text-white"
            >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-pastel-sage text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                        {cart.length}
                    </span>
                )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-pastel-black border-b border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    pathname === item.href
                      ? "text-pastel-blue bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
