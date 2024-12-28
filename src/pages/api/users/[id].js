import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../utils/prisma';
import formidable from 'formidable';
import { uploadImage, deleteImage, getPublicIdFromUrl } from '@/utils/cloudinary';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = Number(req.query.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    switch (req.method) {
      case 'GET':
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            image: true
          }
        });
        return res.status(200).json(user);

        case 'PUT':
          const form = formidable({
            maxFileSize: 5 * 1024 * 1024,
            keepExtensions: true,
            filter: file => file.mimetype?.includes('image/')
          });
        
          const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
              if (err) reject(err);
              console.log('Received files:', files); 
              resolve([fields, files]);
            });
          });
        
       
let imageData = {};
if (files && files.image) {
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { image: true }
  });

  if (currentUser?.image) {
    const publicId = getPublicIdFromUrl(currentUser.image);
    await deleteImage(publicId);
  }

  const uploadResult = await uploadImage(files.image);
  imageData.image = uploadResult.url;
  
  if (fs.existsSync(files.image[0].filepath)) {
    fs.unlinkSync(files.image[0].filepath);
  }
}

        


        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            name: fields.name?.toString(),
            email: fields.email?.toString(),
            ...imageData
          },
          select: {
            id: true,
            email: true,
            name: true,
            image: true
          }
        });

        return res.status(200).json(updatedUser);



      
        case 'DELETE':
          const userToDelete = await prisma.user.findUnique({
            where: { id: userId },
            select: { 
              id: true,
              email: true,
              image: true 
            }
          });
        
          if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
          }
        
          // Delete image from Cloudinary if exists
          if (userToDelete.image) {
            const publicId = getPublicIdFromUrl(userToDelete.image);
            if (publicId) {
              await deleteImage(publicId);
            }
          }
        
          // Delete all related data first
          await prisma.$transaction([
            prisma.task.deleteMany({ where: { userId } }),
            prisma.session.deleteMany({ where: { userId } }),
            prisma.account.deleteMany({ where: { userId } }),
            prisma.user.delete({ where: { id: userId } })
          ]);
        
          return res.status(200).json({ 
            success: true,
            message: 'Account deleted successfully'
          });
        
  break;
        
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
