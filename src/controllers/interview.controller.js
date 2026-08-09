const prisma = require("../utils/prisma");

const scheduleInterview = async (req, res) => {
  try {
    const {
      applicationId,
      scheduledAt,
      duration,
      interviewer,
      meetingLink,
    } = req.body;

    if (!applicationId || !scheduledAt || !duration || !interviewer) {
      return res.status(400).json({
        message:
          "applicationId, scheduledAt, duration and interviewer are required",
      });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const interviewDate = new Date(scheduledAt);

    if (isNaN(interviewDate.getTime())) {
      return res.status(400).json({
        message: "Invalid scheduledAt",
      });
    }

    if (interviewDate <= new Date()) {
      return res.status(400).json({
        message: "Interview must be scheduled for a future date",
      });
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        scheduledAt: interviewDate,
        duration,
        interviewer,
        meetingLink,
      },
    });

    return res.status(201).json({
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  scheduleInterview,
};