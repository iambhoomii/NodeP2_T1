const prisma = require("../utils/prisma");

const getCollegeOverview = async (req, res) => {
  try {
    const { collegeId } = req.params;

    // Check if college exists
    const college = await prisma.college.findUnique({
      where: {
        id: collegeId
      }
    });

    if (!college) {
      return res.status(404).json({
        message: "College not found"
      });
    }

    // Get all students belonging to this college
    const students = await prisma.user.findMany({
      where: {
        collegeId,
        role: "STUDENT"
      },
      select: {
        id: true
      }
    });

    const studentIds = students.map((student) => student.id);

    // Placement statistics
    const applications = await prisma.application.count({
      where: {
        studentId: {
          in: studentIds
        }
      }
    });

    const shortlisted = await prisma.application.count({
      where: {
        studentId: {
          in: studentIds
        },
        status: "SHORTLISTED"
      }
    });

    const selected = await prisma.application.count({
      where: {
        studentId: {
          in: studentIds
        },
        status: "SELECTED"
      }
    });

    const rejected = await prisma.application.count({
      where: {
        studentId: {
          in: studentIds
        },
        status: "REJECTED"
      }
    });

    const interviews = await prisma.interview.count({
      where: {
        application: {
          studentId: {
            in: studentIds
          }
        }
      }
    });

    const offers = await prisma.offer.count({
      where: {
        application: {
          studentId: {
            in: studentIds
          }
        }
      }
    });

    // Calculate placement rate
    const placementRate =
      students.length > 0
        ? Number(((selected / students.length) * 100).toFixed(2))
        : 0;

    return res.status(200).json({
      college: {
        id: college.id,
        name: college.name,
        code: college.code
      },

      stats: {
        students: students.length,
        applications,
        shortlisted,
        selected,
        rejected,
        interviews,
        offers,
        placementRate
      }
    });
  } catch (error) {
    console.error("College overview report error:", error);

    return res.status(500).json({
      message: "Failed to generate college report"
    });
  }
};

module.exports = {
  getCollegeOverview
};