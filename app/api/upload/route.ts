import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  // 1. Security Check
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];
    const categorySlugOrId = formData.get("categoryId") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received" }, { status: 400 });
    }

    // Resolve category ID if a slug was passed (fallback logic)
    let categoryId = categorySlugOrId;
    const category = await prisma.category.findFirst({
        where: { OR: [{ id: categorySlugOrId }, { slug: categorySlugOrId }] }
    });
    
    if (category) {
        categoryId = category.id;
    } else {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const savedPhotos = [];

    for (const file of files) {
      // Upload to Cloudinary
      const url = await uploadToCloudinary(file, 'portfolio/gallery');
      
      // Save to DB
      const photo = await prisma.photo.create({
        data: {
          url: url,
          title: file.name.split('.')[0], // Default title is filename
          categoryId: categoryId,
        }
      });
      savedPhotos.push(photo);
    }

    return NextResponse.json({ success: true, photos: savedPhotos });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
