# TaskFlow Pro - Modern Task Management

## 📋 Table of Contents
1. 🔗 [Live Demo](#live-demo)
2. 📱 [Features](#features)
3. ⚙️ [Tech Stack](#tech-stack)
4. 🚀 [Installation](#installation)
5. 🛠️ [Environment Setup](#environment-setup)



## 🔗 Live Demo
[TaskFlow Pro Demo](https://taskflow-pro.vercel.app)

![App Screenshot](./public/app.png)


## 📱 Features
- Task Management with Real-time Updates
- Smart Authentication System
- Priority Levels & Categories
- Light Weight
- Responsive and Minimalistic UI

## ⚙️ Tech Stack
- Next.js 15
- TailwindCSS
- React
- PostgreSQL
- Prisma ORM
- NextAuth.js
- Google OAuth
- Cloudinary
- Lucide React
- Framer Motion
  

## 🚀 Installation

1. Clone and Install:
git clone https://github.com/CodingCookie/taskflow-pro.git
cd taskflow-pro
npm install

2. Database Setup:
npx prisma migrate dev --name init
npx prisma generate

3. Start Development:
npm run dev


## 🛠️ Environment Setup
Create .env file:

1. Database
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow"

2. Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret

3. OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

4. Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

5. Email
EMAIL_FROM=your-email-from
EMAIL_HOST=your-email-host
EMAIL_PORT=your-email-port
EMAIL_USER=your-email-user
EMAIL_PASSWORD=your-email-password








