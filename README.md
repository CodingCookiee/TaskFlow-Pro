# Todo Application

## Overview
This is a fully functional and responsive Todo web application built with Next.js, PostgreSQL, and Prisma ORM. The application allows users to register, sign in, and manage their tasks efficiently.

## Features
- User authentication via Google or credentials using NextAuth.
- Secure handling of user data.
- Dashboard displaying:
  - Input field to add new tasks.
  - List of tasks with edit and delete functionality.
- Real-time updates for adding, editing, and deleting tasks without page refresh.
- Protected routes for authenticated users.
- Fully responsive design optimized for various devices.

## Technology Stack
- **Frontend**: Next.js, TailwindCSS, ShadCN UI
- **Backend**: Node.js, NextAuth for authentication
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Testing**: Jest for unit and integration tests
- **Deployment**: Netlify, Vercel, or GCP

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the necessary environment variables for database connection and NextAuth configuration.

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

## Assumptions
- Users have a stable internet connection.
- PostgreSQL is installed and configured properly on the local machine.

## License
This project is licensed under the MIT License.