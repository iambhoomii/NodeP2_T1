const bcrypt = require("bcrypt");
const prisma = require("../utils/prisma");
const jwt = require("jsonwebtoken");
const { companySignupSchema } = require("../validators/company.validator");

const signupCompany = async (req, res) => {
  try {
    const validation = companySignupSchema.safeParse(req.body);

if (!validation.success) {
  return res.status(400).json({
    message: "Validation failed",
    errors: validation.error.issues,
  });
}
    const {
      companyName,
      companyEmail,
      password,
      phone,
      website,
      industry,
      location,
      description,
    } = req.body;

    const existingCompany = await prisma.company.findUnique({
      where: {
        email: companyEmail,
      },
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = await prisma.company.create({
      data: {
        name: companyName,
        email: companyEmail,
        phone,
        website,
        industry,
        location,
        description,
        users: {
          create: {
            name: companyName + " Admin",
            email: companyEmail,
            password: hashedPassword,
          },
        },
      },
      include: {
  users: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  },
},
    });

    const token = jwt.sign(
  {
    companyId: company.id,
    email: company.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

    res.status(201).json({
      message: "Company registered successfully",
      token,
      company,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        kyc: true,
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signupCompany,
  getCompanyById,
};