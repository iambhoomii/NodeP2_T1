const crypto = require("crypto");
const prisma = require("../utils/prisma");

/*
  Create a canonical representation of the offer.

  We only hash the important offer data.
  Database metadata such as createdAt/updatedAt is intentionally excluded.
*/
const createCanonicalOfferData = (offer) => {
  return JSON.stringify({
    offerNumber: offer.offerNumber,
    applicationId: offer.applicationId,
    candidateName: offer.candidateName,
    companyName: offer.companyName,
    jobTitle: offer.jobTitle,
    salary: offer.salary,
    joiningDate: new Date(offer.joiningDate).toISOString(),
    expiryDate: new Date(offer.expiryDate).toISOString(),
  });
};

/*
  Generate SHA-256 hash for the canonical offer data.
*/
const generateOfferHash = (offer) => {
  const canonicalData = createCanonicalOfferData(offer);

  return crypto
    .createHash("sha256")
    .update(canonicalData)
    .digest("hex");
};


const generateOffer = async (req, res) => {
  try {
    const {
      applicationId,
      salary,
      joiningDate,
      expiryDate,
    } = req.body;

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

    return res.status(201).json({
      message: "Offer generated successfully",
      offer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


/*
  Select eSign provider and sign the offer.

  This acts as a mock eSign integration for the task.
  A real provider can be plugged in later.
*/
const chooseESign = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { eSignProvider } = req.body;

    const allowedProviders = ["MOCK_ESIGN"];

if (!eSignProvider) {
  return res.status(400).json({
    message: "eSignProvider is required",
  });
}

if (!allowedProviders.includes(eSignProvider)) {
  return res.status(400).json({
    message: "Invalid eSign provider",
    allowedProviders,
  });
}

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

    if (offer.signed) {
      return res.status(400).json({
        message: "Offer is already signed",
      });
    }

    /*
      Generate tamper-evident hash before marking
      the offer as signed.
    */
    const signatureHash = generateOfferHash(offer);

    const updatedOffer = await prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        eSignProvider,
        signed: true,
        signedAt: new Date(),
        signatureHash,
        status: "SIGNED",
      },
    });

    return res.json({
      message: "Offer signed successfully",
      offer: {
        id: updatedOffer.id,
        offerNumber: updatedOffer.offerNumber,
        status: updatedOffer.status,
        signed: updatedOffer.signed,
        signedAt: updatedOffer.signedAt,
        eSignProvider: updatedOffer.eSignProvider,
        signatureHash: updatedOffer.signatureHash,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


/*
  Verify whether the offer has been tampered with.

  The current offer data is hashed again and compared
  with the original stored signatureHash.
*/
const verifyOffer = async (req, res) => {
  try {
    const { offerId } = req.params;

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

    if (!offer.signed || !offer.signatureHash) {
      return res.status(400).json({
        message: "Offer has not been signed yet",
      });
    }

    const currentHash = generateOfferHash(offer);

    const isValid = currentHash === offer.signatureHash;

    return res.json({
      offerId: offer.id,
      offerNumber: offer.offerNumber,
      verified: isValid,
      tampered: !isValid,
      storedHash: offer.signatureHash,
      currentHash,
      message: isValid
        ? "Offer is authentic and has not been tampered with"
        : "Offer integrity check failed. Data may have been tampered with",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


module.exports = {
  generateOffer,
  chooseESign,
  verifyOffer,
};
