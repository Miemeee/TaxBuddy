const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // สร้าง user ตัวอย่าง
  const user = await prisma.user.create({
    data: {
      name: "Test",
      email: "test@example.com",
      password_hash: "mockhash",
      allow_notifications: true
    }
  });

  console.log("Created user:", user);

  // สร้าง deduction master
  await prisma.deduction.createMany({
    data: [
      {
        deduction_name: "Personal Allowance",
        max_limit: 60000,
        tax_year_applies: 2025
      },
      {
        deduction_name: "Parent Support",
        max_limit: 30000,
        tax_year_applies: 2025
      },
      {
        deduction_name: "Insurance",
        max_limit: 100000,
        tax_year_applies: 2025
      }
    ]
  });

  console.log("Seeded deductions");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });