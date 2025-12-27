import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File, folder: string = 'portfolio'): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result?.secure_url || '');
      }
    ).end(buffer);
  });
}

export async function deleteFromCloudinary(imageUrl: string) {
  try {
    // Extract public_id from URL
    // e.g. https://res.cloudinary.com/demo/image/upload/v1234567890/portfolio/my_image.jpg
    // -> portfolio/my_image
    const parts = imageUrl.split('/');
    const filename = parts.pop()?.split('.')[0]; // remove extension
    const folder = parts.pop();
    
    if (filename && folder) {
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
}
