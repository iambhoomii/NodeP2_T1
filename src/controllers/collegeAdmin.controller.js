const prisma = require("../utils/prisma");

const createCollegeAdmin = async (req, res) => {
  try {
    const { userId, collegeId, role } = req.body;

    if (!userId || !collegeId) {
      return res.status(400).json({
        message: "userId and collegeId are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const college = await prisma.college.findUnique({
      where: { id: collegeId }
    });

    if (!college) {
      return res.status(404).json({
        message: "College not found"
      });
    }

    const existingAdmin = await prisma.collegeAdmin.findUnique({
      where: { userId }
    });

    if (existingAdmin) {
      return res.status(409).json({
        message: "User is already assigned as a college admin"
      });
    }

    const collegeAdmin = await prisma.collegeAdmin.create({
      data: {
        userId,
        collegeId,
        role: role || "COLLEGE_ADMIN"
      }
    });

    return res.status(201).json({
      message: "College admin created successfully",
      collegeAdmin
    });
  } catch (error) {
    console.error("Create college admin error:", error);

    return res.status(500).json({
      message: "Failed to create college admin"
    });
  }
};

module.exports = {
  createCollegeAdmin
};