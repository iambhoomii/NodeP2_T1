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
} = require("../controllers/payment.controller");

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

router.post("/capture-and-apply", captureAndApply);

router.post("/issue-receipt", issueReceipt);

router.post("/refund", refundPayment);

// Static route BEFORE dynamic route
router.get("/reconcile", reconcilePayments);

// Keep this LAST
router.get("/:id", getPaymentById);

module.exports = router;