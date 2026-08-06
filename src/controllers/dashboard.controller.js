const prisma = require("../utils/prisma");

const getRevenueDashboard = async (req, res) => {
  try {
    // Total successful revenue
    const successfulPayments = await prisma.payment.aggregate({
      where: {
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    // Total refunded amount
    const refundedPayments = await prisma.payment.aggregate({
      where: {
        status: "REFUNDED",
      },
      _sum: {
        refundedAmount: true,
      },
      _count: {
        id: true,
      },
    });

    // Failed payment count
    const failedPayments = await prisma.payment.count({
      where: {
        status: "FAILED",
      },
    });

    res.json({
      totalRevenue: successfulPayments._sum.amount || 0,
      successfulPayments: successfulPayments._count.id,
      refundedAmount: refundedPayments._sum.refundedAmount || 0,
      refundedPayments: refundedPayments._count.id,
      failedPayments,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getRevenueDashboard,
};