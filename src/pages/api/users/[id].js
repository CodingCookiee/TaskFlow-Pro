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
              resolve([fields, files]);
            });
          });
        
          const updateData = {};
          
          // Handle name and email updates
          if (fields.name) {
            updateData.name = fields.name.toString();
          }
          
          if (fields.email) {
            // Check if email is already taken
            const existingUser = await prisma.user.findUnique({
              where: { 
                email: fields.email.toString(),
                NOT: { id: userId }
              }
            });
        
            if (existingUser) {
              return res.status(400).json({ message: 'Email already in use' });
            }
            
            updateData.email = fields.email.toString();
          }
          // Handle image update
        if (files?.image) {
          const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { image: true }
          });

          // Delete old image if it exists and isn't a Google profile picture
          if (currentUser?.image && !currentUser.image.includes('googleusercontent.com')) {
            const publicId = getPublicIdFromUrl(currentUser.image);
            if (publicId) {
              await deleteImage(publicId);
            }
          }

          const uploadResult = await uploadImage(files.image);
          updateData.image = uploadResult.url;

          // Clean up temporary file
          if (fs.existsSync(files.image[0].filepath)) {
            fs.unlinkSync(files.image[0].filepath);
          }
        }
          
          // Handle image update logic...
        
          const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
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
      
        // Delete user's image if it exists and isn't a Google profile picture
        if (userToDelete.image && !userToDelete.image.includes('googleusercontent.com')) {
          const publicId = getPublicIdFromUrl(userToDelete.image);
          if (publicId) {
            await deleteImage(publicId);
          }
        }
      
        // Delete all user data in transaction
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
      
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
