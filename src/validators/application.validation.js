const { z } = require("zod");

const applicationSchema = z.object({
  studentId: z.string().uuid("Invalid student ID"),
  jobId: z.string().uuid("Invalid job ID"),
});

module.exports = {
  applicationSchema,
};