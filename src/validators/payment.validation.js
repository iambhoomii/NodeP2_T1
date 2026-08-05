const { z } = require("zod");

const createOrderSchema = z.object({
  applicationId: z.string().uuid(),
  amount: z.number().int().positive(),
});

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

const captureAndApplySchema = z.object({
  paymentId: z.string().uuid(),
  studentId: z.string().uuid(),
  jobId: z.string().uuid(),
});

const failPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  reason: z.string().optional(),
});

module.exports = {
  createOrderSchema,
  verifyPaymentSchema,
  captureAndApplySchema,
  failPaymentSchema,
};