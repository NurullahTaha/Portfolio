import { prisma } from "@/lib/prisma";
import AddGearForm from "@/app/components/AddGearForm";
import GearList from "@/app/components/GearList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminGearPage() {
  const gear = await prisma.gear.findMany({
    orderBy: { purchaseDate: 'desc' }
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
            <div>
                <h1 className="text-4xl font-bold text-white">Manage Gear</h1>
                <p className="text-gray-400 mt-2">Track your camera history.</p>
            </div>
            <AddGearForm />
        </div>
      </div>

      <GearList items={gear} />
    </div>
  );
}
