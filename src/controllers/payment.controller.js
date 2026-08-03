const crypto = require("crypto");
const prisma = require("../utils/prisma");
const razorpay = require("../utils/razorpay");

const {
  createOrderSchema,
  verifyPaymentSchema,
  captureAndApplySchema,
} = require("../validators/payment.validation");

const createOrder = async (req, res) => {
  try {
    const validation = createOrderSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
    });
}

const { applicationId, amount } = validation.data;

const existingPayment = await prisma.payment.findFirst({
  where: {
    applicationId,
    status: "PENDING",
  },
});

if (existingPayment) {
  return res.status(409).json({
    message: "A pending payment already exists for this application.",
    payment: existingPayment,
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

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await prisma.payment.create({
      data: {
        applicationId,
        amount,
        currency: "INR",
        razorpayOrderId: order.id,
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
      payment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const validation = verifyPaymentSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validation.error.issues,
        });
    }

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = validation.data;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            const existingPayment = await prisma.payment.findUnique({
  where: {
    razorpayOrderId: razorpay_order_id,
  },
});

if (!existingPayment) {
  return res.status(404).json({
    message: "Payment not found",
  });
}

        return res.status(400).json({
             message: "Payment verification failed",
        });
    }

    const payment = await prisma.payment.update({
      where: {
        razorpayOrderId: razorpay_order_id,
      },
      data: {
        status: "SUCCESS",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    res.json({
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const captureAndApply = async (req, res) => {
  try {
    const validation = captureAndApplySchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.issues,
      });
    }

    const { paymentId, studentId, jobId } = validation.data;

    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    if (payment.status !== "SUCCESS") {
      return res.status(400).json({
        message: "Payment not completed. Please complete payment first.",
      });
    }

    const application = await prisma.application.findUnique({
      where: {
        studentId_jobId: {
          studentId,
          jobId,
        },
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    const updatedApplication = await prisma.application.update({
      where: {
        id: application.id,
      },
      data: {
        status: "PAID",
      },
    });

    res.status(200).json({
      message: "Payment captured successfully. Application unlocked.",
        application: updatedApplication,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        application: {
          include: {
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            job: true,
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getPaymentById,
  captureAndApply,
};