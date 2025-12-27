"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function addProduct(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Math.round(parseFloat(formData.get("price") as string) * 100); 
  const category = formData.get("category") as string;
  
  // The images are now uploaded client-side
  const imageBefore = formData.get("imageBefore") as string;
  const imageAfter = formData.get("imageAfter") as string;

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      imageBefore,
      imageAfter,
    },
  });

  revalidatePath("/shop");
  revalidatePath("/admin/store");
}

export async function deleteProduct(id: string, imageAfter: string, imageBefore?: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  // 1. Delete from DB
  await prisma.product.delete({ where: { id } });

  // 2. Delete files from Cloud
  if (imageAfter) await deleteFromCloudinary(imageAfter);
  if (imageBefore) await deleteFromCloudinary(imageBefore);

  revalidatePath("/shop");
  revalidatePath("/admin/store");
}
