"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Check } from 'lucide-react';
import Image from 'next/image';

export default function UploadZone({ categoryId }: { categoryId: string }) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    setSuccess(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: { 'image/*': [] }
  });

  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });
    formData.append('categoryId', categoryId);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSuccess(true);
        setFiles([]);
        // Ideally refresh the page here to see new photos
        window.location.reload(); 
      }
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragActive ? 'border-pastel-blue bg-pastel-blue/10' : 'border-gray-600 hover:border-gray-400 hover:bg-white/5'}
        `}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-pastel-blue font-medium">Drop the photos here...</p>
        ) : (
          <div className="text-center text-gray-400">
            <p className="font-medium text-white">Drag & drop photos here</p>
            <p className="text-sm mt-1">or click to select files</p>
          </div>
        )}
      </div>

      {/* Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {files.map((file) => (
            <div key={file.name} className="relative aspect-square rounded-lg overflow-hidden border border-white/20">
               <Image 
                 src={file.preview} 
                 alt="Preview" 
                 fill 
                 className="object-cover"
                 onLoad={() => { URL.revokeObjectURL(file.preview) }}
               />
               <button 
                 onClick={() => setFiles(files.filter(f => f !== file))}
                 className="absolute top-1 right-1 bg-black/50 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
               >
                 <X className="w-4 h-4" />
               </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={uploadFiles}
          disabled={uploading}
          className="w-full py-3 bg-pastel-blue text-pastel-black font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? 'Uploading...' : 'Upload Photos'}
        </button>
      )}

      {success && (
        <div className="flex items-center gap-2 text-pastel-green mt-2">
          <Check className="w-5 h-5" />
          <span>Upload successful!</span>
        </div>
      )}
    </div>
  );
}
