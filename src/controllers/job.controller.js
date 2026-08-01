const prisma = require("../utils/prisma");
const crypto = require("crypto");
const { jobSchema } = require("../validators/job.validation");

const createJob = async (req, res) => {
  try {
    const validation = jobSchema.safeParse(req.body);

if (!validation.success) {
  return res.status(400).json({
    message: "Validation failed",
    errors: validation.error.issues,
  });
}
    const {
      companyId,
      title,
      description,
      location,
      experience,
      thresholds,
    } = req.body;

    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const assessmentLink = `http://localhost:3000/assessment/${crypto.randomUUID()}`;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        location,
        experience,
        assessmentLink,
        companyId,
        thresholds: {
          create: thresholds,
        },
      },
      include: {
        thresholds: true,
      },
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
  company: true,

  thresholds: true,

  applications: {
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
},
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const searchJobs = async (req, res) => {
  try {
    const { keyword, location, experience } = req.query;

    const where = {};

    if (keyword) {
      where.OR = [
        {
          title: {
            contains: keyword,
          },
        },
        {
          description: {
            contains: keyword,
          },
        },
      ];
    }

    if (location) {
      where.location = {
        contains: location,
      };
    }

    if (experience) {
      where.experience = {
        contains: experience,
      };
    }

    let jobs = await prisma.job.findMany({
      where,
include: {
  company: true,

  thresholds: true,

  applications: {
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
},
    });

    // Simple ranking
    if (keyword) {
      const search = keyword.toLowerCase();

      jobs = jobs
        .map((job) => {
          let score = 0;

          if (job.title.toLowerCase().includes(search)) score += 2;
          if (job.description.toLowerCase().includes(search)) score += 1;

          return {
            ...job,
            score,
          };
        })
        .sort((a, b) => b.score - a.score);
    } else {
      jobs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.json({
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createJob,
  getJobById,
  searchJobs,
};