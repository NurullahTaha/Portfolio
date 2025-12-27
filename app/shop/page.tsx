import { prisma } from "@/lib/prisma";
import ProductCard from "@/app/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop | Portfolio",
};

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional presets and high-quality prints to elevate your work.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400">New products coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageAfter={product.imageAfter}
                    imageBefore={product.imageBefore}
                    category={product.category}
                    description={product.description}
                />
            ))}
        </div>
      )}
    </div>
  );
}
