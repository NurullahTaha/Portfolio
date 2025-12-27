"use client";

import { useState } from "react";
import { Plus, X, Package, DollarSign, Loader2 } from "lucide-react";
import { addProduct } from "@/app/actions/productActions";
import { getSignature } from "@/app/actions/cloudinarySign";
import imageCompression from "browser-image-compression";

export default function AddProductForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-pastel-sage text-black font-bold rounded-xl hover:bg-white transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Product
      </button>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Prevent default form submission

    setUploading(true);
    try {
        const formData = new FormData(event.currentTarget); // Get form data from event
        
        const fileAfter = formData.get("imageAfter") as File;
        const fileBefore = formData.get("imageBefore") as File;
        
        if (!fileAfter || fileAfter.size === 0) {
            throw new Error("An 'After' image is required.");
        }

        const compressionOptions = {
            maxSizeMB: 5,          // Target 5MB (to fit well under 10MB limit)
            maxWidthOrHeight: 1500, // Reduced max resolution
            useWebWorker: true,
        };

        // Helper to compress and upload one file
        const uploadCompressedFile = async (file: File) => {
            let compressedFile = file;
            try {
                compressedFile = await imageCompression(file, compressionOptions);
            } catch (error) {
                console.warn("Image compression failed, trying original file.", error);
            }

            // Get Signature from server
            const { timestamp, signature } = await getSignature();

            // Upload to Cloudinary directly from client
            const uploadData = new FormData();
            uploadData.append('file', compressedFile, file.name);
            uploadData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '827563939799928');
            uploadData.append('timestamp', timestamp.toString());
            uploadData.append('signature', signature);
            uploadData.append('folder', 'portfolio/products');

            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dn8clfnty'}/image/upload`, {
                method: 'POST',
                body: uploadData,
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Cloudinary upload error:", data.error?.message);
                throw new Error(data.error?.message || "Upload to Cloudinary failed.");
            }
            return data.secure_url;
        };

        // Upload 'After' image
        const imageAfterUrl = await uploadCompressedFile(fileAfter);
        
        // Upload 'Before' image if provided
        let imageBeforeUrl = "";
        if (fileBefore && fileBefore.size > 0) {
            imageBeforeUrl = await uploadCompressedFile(fileBefore);
        }

        // Now, send only the URLs and other data to the server action
        const serverFormData = new FormData();
        serverFormData.append("name", formData.get("name") as string);
        serverFormData.append("description", formData.get("description") as string);
        serverFormData.append("price", formData.get("price") as string);
        serverFormData.append("category", formData.get("category") as string);
        serverFormData.append("imageAfter", imageAfterUrl);
        serverFormData.append("imageBefore", imageBeforeUrl);

        await addProduct(serverFormData);
        
        setIsOpen(false);
    } catch (error) {
        console.error("Product creation failed:", error);
        alert(`Failed to create product: ${(error as Error).message || "Unknown error"}`);
    } finally {
        setUploading(false);
    }
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
            <Package className="w-6 h-6 text-pastel-sage" />
            New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
                <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                <input name="name" required placeholder="e.g. Urban Moody Preset Pack" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                        <input name="price" type="number" step="0.01" required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-pastel-sage outline-none" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <select name="category" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none">
                        <option value="Preset">Digital Preset</option>
                        <option value="Print">Physical Print</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea name="description" rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-pastel-sage outline-none" />
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-1">Product Images</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <span className="text-xs text-pastel-sage uppercase tracking-wider mb-1 block">After (Main)</span>
                        <input type="file" name="imageAfter" accept="image/*" required className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600" />
                    </div>
                    <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Before (Optional)</span>
                        <input type="file" name="imageBefore" accept="image/*" className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-xs file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600" />
                    </div>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={uploading}
                className="w-full py-4 bg-pastel-sage text-black font-bold rounded-xl hover:bg-white transition-colors mt-2 flex justify-center items-center gap-2 disabled:opacity-50"
            >
                {uploading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" /> 
                        Compressing & Uploading...
                    </>
                ) : (
                    "Create Product"
                )}
            </button>
        </form>
      </div>
    </div>
  );
}
