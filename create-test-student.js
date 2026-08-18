const prisma = require("./src/utils/prisma");

async function main() {
  const student = await prisma.user.create({
    data: {
      name: "ACSCE Test Student",
      email: "student@acsce.edu.in",
      password: "test1234",
      role: "STUDENT",
      collegeId: "b23d1b33-8745-49ab-8e83-0053ea2a0eb3"
    }
  });

  console.log("Test student created:");
  console.log(student);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });