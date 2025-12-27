"use client";

import { useCart } from "@/app/context/CartContext";
import { X, Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function CartSidebar() {
  const { cart, removeFromCart, toggleCart, isCartOpen, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-pastel-black border-l border-white/10 z-[70] p-6 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6 text-pastel-sage" />
                    Your Cart
                </h2>
                <button onClick={toggleCart} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium">{item.name}</h4>
                                <p className="text-pastel-sage text-sm">${(item.price / 100).toFixed(2)}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-gray-400">Total</span>
                    <span className="text-3xl font-bold text-white">${(cartTotal / 100).toFixed(2)}</span>
                </div>
                <button 
                    disabled={cart.length === 0}
                    className="w-full py-4 bg-pastel-sage text-black font-bold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Checkout (Stripe)
                </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
