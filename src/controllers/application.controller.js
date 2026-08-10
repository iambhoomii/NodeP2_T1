const prisma = require("../utils/prisma");
const { applicationSchema } = require("../validators/application.validation");

const applyJob = async (req, res) => {
  try {
    const data = applicationSchema.parse(req.body);

    const student = await prisma.user.findUnique({
  where: {
    id: data.studentId,
  },
});

if (!student) {
  return res.status(404).json({
    message: "Student not found",
  });
}

const job = await prisma.job.findUnique({
  where: {
    id: data.jobId,
  },
});

if (!job) {
  return res.status(404).json({
    message: "Job not found",
  });
}

    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId: data.studentId,
          jobId: data.jobId,
        },
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Student has already applied for this job",
      });
    }

    const application = await prisma.application.create({
     data,
    });

    await prisma.applicationStatusHistory.create({
      data: {
        applicationId: application.id,
        status: "APPLIED",
        previousStatus: null,
       changedBy: data.studentId,
      reason: "Application submitted",
      },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    if (error.errors) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await prisma.application.findMany({
      where: {
        jobId,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const shortlistApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const existingApplication = await prisma.application.findUnique({
  where: {
    id: applicationId,
  },
});

if (!existingApplication) {
  return res.status(404).json({
    message: "Application not found",
  });
}

const application = await prisma.application.update({
  where: {
    id: applicationId,
  },
  data: {
    status: "SHORTLISTED",
  },
});

await prisma.applicationStatusHistory.create({
  data: {
    applicationId: application.id,
    status: "SHORTLISTED",
    previousStatus: existingApplication.status,
    changedBy: "COMPANY_ADMIN",
    reason: "Candidate shortlisted",
  },
});

    res.json({
      message: "Candidate shortlisted successfully",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  applyJob,
  getApplicationsByJob,
  shortlistApplication,
};