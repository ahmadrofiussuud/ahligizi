import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'rizky.fitrianto@gmail.com' },
    update: {},
    create: {
      id: 'usr-demo-1',
      name: 'Rizky Fitrianto',
      email: 'rizky.fitrianto@gmail.com',
      daily_calorie_target: 2000,
    },
  });

  console.log('Database seeded successfully!', { user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
