"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function addGear(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const purchaseDate = new Date(formData.get("purchaseDate") as string);
  const isCurrent = formData.get("isCurrent") === "on";
  
  // Optional: Retire Date
  const retireDateStr = formData.get("retireDate") as string;
  const retireDate = retireDateStr ? new Date(retireDateStr) : null;

  await prisma.gear.create({
    data: {
      name,
      type,
      description,
      purchaseDate,
      retireDate,
      isCurrent,
    },
  });

  revalidatePath("/gear");
  revalidatePath("/admin/gear");
}

export async function deleteGear(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.gear.delete({
    where: { id },
  });

  revalidatePath("/gear");
  revalidatePath("/admin/gear");
}
