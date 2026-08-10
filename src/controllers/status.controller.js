const prisma = require("../utils/prisma");

const getApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        statusHistory: {
          orderBy: {
            changedAt: "asc",
          },
        },
        offer: true,
        interviews: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.json({
      applicationId: application.id,
      currentStatus: application.status,
      statusHistory: application.statusHistory,
      interviews: application.interviews,
      offer: application.offer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getApplicationStatus,
};
