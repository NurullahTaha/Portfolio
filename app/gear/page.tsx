import { prisma } from "@/lib/prisma";
import clsx from "clsx";

export const metadata = {
  title: "Gear | Portfolio",
  description: "A timeline of the equipment I use.",
};

export default async function GearPage() {
  const gearList = await prisma.gear.findMany({
    orderBy: { purchaseDate: 'desc' }
  });

  // Demo data if empty
  const displayGear = gearList.length > 0 ? gearList : [
    { id: '1', name: 'Canon EOS R5', type: 'Camera Body', isCurrent: true, purchaseDate: new Date('2023-01-01'), description: 'My current daily driver. The autofocus is unmatched.' },
    { id: '2', name: 'RF 24-70mm f/2.8', type: 'Lens', isCurrent: true, purchaseDate: new Date('2023-02-15'), description: 'The sharpest zoom lens I have ever owned.' },
    { id: '3', name: 'Sony A7III', type: 'Camera Body', isCurrent: false, purchaseDate: new Date('2018-05-20'), retireDate: new Date('2022-12-01'), description: 'Moved to Canon for the colors, but this was a beast.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-16 text-center">My Gear History</h1>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-12">
        {displayGear.map((item, index) => (
          <div key={item.id} className="relative pl-8 md:pl-12">
            
            {/* Timeline Dot */}
            <div className={clsx(
              "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-pastel-black",
              item.isCurrent ? "bg-pastel-green" : "bg-gray-600"
            )} />

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <span className={clsx(
                  "text-xs px-2 py-1 rounded-full w-fit mt-2 md:mt-0",
                  item.isCurrent ? "bg-pastel-green/20 text-pastel-green" : "bg-gray-700 text-gray-400"
                )}>
                  {item.isCurrent ? "Current Gear" : "Retired"}
                </span>
              </div>
              
              <div className="text-sm text-pastel-blue mb-3 font-mono">
                {item.type} • {new Date(item.purchaseDate!).getFullYear()}
                {!item.isCurrent && item.retireDate && ` - ${new Date(item.retireDate).getFullYear()}`}
              </div>
              
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
