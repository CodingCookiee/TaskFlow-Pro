import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (file) => {
  if (!file || !file[0] || !file[0].filepath) {
    throw new Error('No file provided');
  }

  try {
    const result = await cloudinary.uploader.upload(file[0].filepath, {
      folder: 'taskflow-pro/users',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'webp'],
      resource_type: 'image',
      transformation: [
        { width: 500, height: 500, crop: 'fill' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw new Error('Image upload failed');
  }
};

export const deleteImage = async (publicId) => {
  if (!publicId) return;
  
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete failed:', error);
    throw new Error('Image deletion failed');
  }
};

export const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const splits = url.split('/');
  const lastTwo = splits.slice(-2);
  return `${lastTwo[0]}/${lastTwo[1].split('.')[0]}`;
};
