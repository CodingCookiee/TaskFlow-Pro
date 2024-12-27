const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash('@kadufluffy', 10);

  // Create a user with a unique email address
  const user = await prisma.user.create({
    data: {
      email: 'razaawanpersonal@gmail.com', 
      password: hashedPassword, 
    },
  });

  // Create some tasks for the user
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