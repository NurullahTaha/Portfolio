"use client";

import { Trash2, Calendar, Camera } from "lucide-react";
import { deleteGear } from "@/app/actions/gearActions";
import clsx from "clsx";

export default function GearList({ items }: { items: any[] }) {
  const handleDelete = async (id: string) => {
    if (confirm("Delete this item?")) {
        await deleteGear(id);
    }
  };

  if (items.length === 0) {
    return <div className="text-gray-500 italic">No gear added yet.</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-xl group hover:border-pastel-sage/50 transition-colors">
            <div className="flex items-center gap-4">
                <div className={clsx(
                    "p-3 rounded-lg",
                    item.isCurrent ? "bg-pastel-sage/20 text-pastel-sage" : "bg-gray-800 text-gray-500"
                )}>
                    <Camera className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        <span className="bg-white/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider">{item.type}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.purchaseDate).getFullYear()}</span>
                        {!item.isCurrent && <span className="text-red-400">(Retired)</span>}
                    </div>
                </div>
            </div>
            
            <button 
                onClick={() => handleDelete(item.id)}
                className="p-3 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
      ))}
    </div>
  );
}
