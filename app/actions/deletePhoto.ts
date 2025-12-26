"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { unlink } from "fs/promises";
import path from "path";
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

    // 3. Remove file from disk (Cleanup)
    if (photoUrl.startsWith("/uploads/")) {
        // Convert web URL to file path
        // e.g., /uploads/image.jpg -> /Users/nuri/.../public/uploads/image.jpg
        const relativePath = photoUrl.substring(1); // remove leading slash
        const absolutePath = path.join(process.cwd(), "public", relativePath);
        
        try {
            await unlink(absolutePath);
        } catch (err) {
            console.error("Failed to delete file from disk:", err);
            // We continue even if file delete fails (DB is more important)
        }
    }

    // 4. Refresh the page so the photo disappears instantly
    revalidatePath("/gallery/[slug]", "page");
    revalidatePath("/admin/gallery/[slug]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete photo" };
  }
}
