const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentById,
} = require("../controllers/payment.controller");

router.get("/:id", getPaymentById);

router.post("/create-order", createOrder);

router.post("/verify", verifyPayment);

module.exports = router;