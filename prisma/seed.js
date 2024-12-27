const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create demo users
    const hashedPassword = await hash('Demo@123', 12);
    
    const demoUser = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
        password: hashedPassword,
        image: 'https://ui-avatars.com/api/?name=Demo+User',
      },
    });

    const adminUser = await prisma.user.create({
      data: {
        email: 'admin@taskflow.com',
        name: 'Admin User',
        password: hashedPassword,
        image: 'https://ui-avatars.com/api/?name=Admin+User',
      },
    });

    // Create sample tasks for demo user
    const demoTasks = [
      {
        title: 'Complete Project Documentation',
        description: 'Write comprehensive documentation for the TaskFlow project',
        completed: false,
        userId: demoUser.id,
      },
      {
        title: 'Review Pull Requests',
        description: 'Review and merge pending pull requests',
        completed: true,
        userId: demoUser.id,
      },
      {
        title: 'Update Dependencies',
        description: 'Update project dependencies to latest versions',
        completed: false,
        userId: demoUser.id,
      },
    ];

    // Create sample tasks for admin user
    const adminTasks = [
      {
        title: 'System Maintenance',
        description: 'Perform routine system maintenance',
        completed: false,
        userId: adminUser.id,
      },
      {
        title: 'User Analytics Review',
        description: 'Review user engagement metrics',
        completed: false,
        userId: adminUser.id,
      },
    ];

    // Bulk create tasks
    await prisma.task.createMany({
      data: [...demoTasks, ...adminTasks],
    });

    console.log('🌱 Seed data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
