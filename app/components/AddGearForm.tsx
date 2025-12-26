"use client";

import { useState } from "react";
import { Plus, X, Camera, Watch } from "lucide-react";
import { addGear } from "@/app/actions/gearActions";

export default function AddGearForm() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-pastel-sage text-black font-bold rounded-xl hover:bg-white transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add New Gear
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-pastel-black border border-white/10 rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
        <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
            <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Camera className="w-6 h-6 text-pastel-sage" />
            Add Equipment
        </h2>

        <form action={async (formData) => {
            await addGear(formData);
            setIsOpen(false);
        }} className="space-y-4">
            
            <div>
                <label className="block text-sm text-gray-400 mb-1">Gear Name</label>
                <input name="name" required placeholder="e.g. Canon R5" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Type</label>
                    <select name="type" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none">
                        <option value="Camera">Camera Body</option>
                        <option value="Lens">Lens</option>
                        <option value="Drone">Drone</option>
                        <option value="Accessory">Accessory</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Purchase Date</label>
                    <input name="purchaseDate" type="date" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none" />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea name="description" rows={3} placeholder="Why do you use this?" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <input type="checkbox" name="isCurrent" defaultChecked id="current" className="w-5 h-5 accent-pastel-sage" />
                <label htmlFor="current" className="text-white">This is my current gear</label>
            </div>

            <button type="submit" className="w-full py-4 bg-pastel-sage text-black font-bold rounded-xl hover:bg-white transition-colors mt-2">
                Save Gear
            </button>
        </form>
      </div>
    </div>
  );
}
