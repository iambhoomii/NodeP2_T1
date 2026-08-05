const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentById,
  captureAndApply,
  issueReceipt,
  refundPayment,
  reconcilePayments,
  failPayment,
} = require("../controllers/payment.controller");

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

router.post("/capture-and-apply", captureAndApply);

router.post("/issue-receipt", issueReceipt);

router.post("/refund", refundPayment);

// Static route BEFORE dynamic route
router.get("/reconcile", reconcilePayments);

router.post("/fail", failPayment);

// Keep this LAST
router.get("/:id", getPaymentById);

module.exports = router;