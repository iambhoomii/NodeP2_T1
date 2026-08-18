const prisma = require("./src/utils/prisma");

async function main() {
  const application = await prisma.application.create({
    data: {
      studentId: "860167b4-f2ae-4845-a6c9-138b91bd3a58",
      jobId: "d3cf6f4f-b30c-4d1c-b2de-b2d4bc261041"
    }
  });

  console.log("Test application created:");
  console.log(application);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });