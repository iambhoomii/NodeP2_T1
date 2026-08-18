const prisma = require("../utils/prisma");

const createCollege = async (req, res) => {
  try {
    const { name, code, email, phone, website, address } = req.body;

    if (!name || !code || !email) {
      return res.status(400).json({
        message: "Name, code and email are required"
      });
    }

    const existingCollege = await prisma.college.findFirst({
      where: {
        OR: [
          { code },
          { email }
        ]
      }
    });

    if (existingCollege) {
      return res.status(409).json({
        message: "College with this code or email already exists"
      });
    }

    const college = await prisma.college.create({
      data: {
        name,
        code,
        email,
        phone,
        website,
        address
      }
    });

    return res.status(201).json({
      message: "College created successfully",
      college
    });
  } catch (error) {
    console.error("Create college error:", error);

    return res.status(500).json({
      message: "Failed to create college"
    });
  }
};

module.exports = {
  createCollege
};