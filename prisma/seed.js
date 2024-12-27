const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    // Create demo user
    const hashedPassword = await hash('Demo@123', 12);
    const demoUser = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
        password: hashedPassword,
      },
    });

    // Create sample tasks
    const tasks = [
      {
        title: 'Complete Project Documentation',
        description: 'Write comprehensive documentation for the project',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: demoUser.id,
      },
      {
        title: 'Review Pull Requests',
        description: 'Review and merge pending pull requests',
        priority: 'MEDIUM',
        userId: demoUser.id,
      },
      {
        title: 'Update Dependencies',
        description: 'Update project dependencies to latest versions',
        priority: 'LOW',
        userId: demoUser.id,
      },
    ];

    for (const task of tasks) {
      await prisma.task.create({ data: task });
    }

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
