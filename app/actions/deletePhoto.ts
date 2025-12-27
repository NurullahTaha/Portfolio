"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function deletePhoto(photoId: string, photoUrl: string) {
  // 1. Security Check
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // 2. Remove from Database
    await prisma.photo.delete({
      where: { id: photoId },
    });

    // 3. Remove from Cloud
    await deleteFromCloudinary(photoUrl);

    // 4. Refresh the page so the photo disappears instantly
    revalidatePath("/gallery/[slug]", "page");
    revalidatePath("/admin/gallery/[slug]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete photo" };
  }
}
