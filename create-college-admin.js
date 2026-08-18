const prisma = require("./src/utils/prisma");

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Bhoomi College Admin",
      email: "collegeadmin@acsce.edu.in",
      password: "test1234",
      role: "COLLEGE_ADMIN"
    }
  });

  console.log("College admin user created:");
  console.log(user);
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });