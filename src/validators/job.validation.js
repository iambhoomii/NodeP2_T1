const { z } = require("zod");

const jobSchema = z.object({
  companyId: z.uuid(),

  title: z.string().min(2, "Job title is required"),

  description: z.string().min(5, "Description is required"),

  location: z.string().optional(),

  experience: z.string().optional(),

  thresholds: z
    .array(
      z.object({
        skill: z.string().min(1, "Skill is required"),
        threshold: z
          .number()
          .int()
          .min(0, "Threshold must be at least 0")
          .max(100, "Threshold cannot exceed 100"),
      })
    )
    .min(1, "At least one skill threshold is required"),
});

module.exports = {
  jobSchema,
};