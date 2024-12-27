# TaskFlow Pro - Modern Task Management

## Overview
TaskFlow Pro is a sophisticated task management solution built with Next.js and PostgreSQL. It delivers a premium user experience with server-side rendering, real-time updates, and a sleek interface.

## Key Features
✨ **Smart Authentication**
- Secure email/password login
- Google OAuth integration
- JWT token security

🚀 **Powerful Task Management**
- Intuitive task creation and editing
- Real-time status updates
- Priority levels
- Collaborative features

💎 **Premium Design**
- Modern, responsive interface
- Clean animations
- Mobile-first approach
- Dark/Light mode support

🛡️ **Enterprise Security**
- Protected API routes
- Data encryption
- Session management
- Role-based access

## Tech Architecture
- **Frontend**: Next.js 13+
- **Styling**: TailwindCSS
- **Backend**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Icons**: Lucide React

## Quick Setup
1. Clone and install:
```bash
git clone https://github.com/yourusername/taskflow-pro.git
cd taskflow-pro
npm install


3. Set up environment variables:
   - DATABASE_URL=
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=
- JWT_SECRET=
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=


4. Set up the database:
   - Ensure PostgreSQL is running and create a database.
   - Run Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Testing
- Run tests using Jest:
  ```
  npm run test
  ```

## Screenshots
- Include screenshots of the following pages:
  - Home
  - Sign In
  - Register
  - Dashboard
  - Edit Page

## Database Dump
- Include a dump of the PostgreSQL database used for testing.

## Code Execution Time Complexity
- Task Addition: O(1)
- Task Deletion: O(n) (in the worst case, if searching for the task)
- Task Update: O(n) (if searching for the task to update)