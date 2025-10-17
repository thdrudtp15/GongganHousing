'use server';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image: File) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(imageData).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: 'gonggan-housing',
  });
  return result.secure_url;
}

export const removeImages = async ({ urls }: { urls: string[] }) => {
  const publicIds = urls.map((url) => {
    const urlParts = url.split('/');
    const folder = 'gonggan-housing';
    const filename = urlParts[urlParts.length - 1].split('.')[0];
    return `${folder}/${filename}`;
  });

  const result = await cloudinary.api.delete_resources(publicIds);
  return result;
};
