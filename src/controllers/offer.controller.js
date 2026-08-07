const prisma = require("../utils/prisma");

const generateOffer = async (req, res) => {
  try {
    const { applicationId, salary, joiningDate, expiryDate } = req.body;

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        student: true,
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status !== "SHORTLISTED") {
      return res.status(400).json({
        message: "Candidate is not shortlisted",
      });
    }

    const existingOffer = await prisma.offer.findUnique({
      where: {
        applicationId,
      },
    });

    if (existingOffer) {
      return res.status(400).json({
        message: "Offer already generated",
      });
    }

    const offer = await prisma.offer.create({
      data: {
        applicationId,
        offerNumber: `OFF-${Date.now()}`,
        candidateName: application.student.name,
        companyName: application.job.company.name,
        jobTitle: application.job.title,
        salary,
        joiningDate: new Date(joiningDate),
        expiryDate: new Date(expiryDate),
      },
    });

    res.status(201).json({
      message: "Offer generated successfully",
      offer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const chooseESign = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { eSignProvider } = req.body;

    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
    });

    if (!offer) {
      return res.status(404).json({
        message: "Offer not found",
      });
    }

    const updatedOffer = await prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        eSignProvider,
      },
    });

    res.json({
      message: "eSign provider selected successfully",
      offer: updatedOffer,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  generateOffer,
  chooseESign,
};