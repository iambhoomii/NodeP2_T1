const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentById,
  captureAndApply,
} = require("../controllers/payment.controller");

router.get("/:id", getPaymentById);

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

router.post("/capture-and-apply", captureAndApply);

module.exports = router;