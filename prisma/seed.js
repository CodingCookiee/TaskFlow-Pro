const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      email: 'uniqueuser@example.com',
      password: hashedPassword,
    },
  });

  await prisma.task.createMany({
    data: [
      { name: 'Task 1', userId: user.id },
      { name: 'Task 2', userId: user.id },
      { name: 'Task 3', userId: user.id },
    ],
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });