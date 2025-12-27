import { prisma } from "@/lib/prisma";
import AddProductForm from "@/app/components/AddProductForm";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/productActions";

export const dynamic = "force-dynamic";

export default async function AdminStorePage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-4xl font-bold text-white">Manage Store</h1>
                <p className="text-gray-400 mt-2">Add or remove products.</p>
            </div>
            <AddProductForm />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
            <div key={product.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                <div className="relative h-48 w-full">
                    <Image src={product.imageAfter} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">{product.name}</h3>
                            <p className="text-pastel-sage font-mono">${(product.price / 100).toFixed(2)}</p>
                        </div>
                        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300 uppercase">{product.category}</span>
                    </div>
                    
                    <form action={async () => {
                        "use server";
                        await deleteProduct(product.id, product.imageAfter, product.imageBefore || undefined);
                    }}>
                        <button className="w-full py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete Product
                        </button>
                    </form>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}
