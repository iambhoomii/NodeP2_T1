const { z } = require("zod");

const companySignupSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  companyEmail: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10).max(15).optional(),
  website: z.string().optional(),
  industry: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
});

module.exports = {
  companySignupSchema,
};