const express = require("express");
const router = express.Router();

const {
  getRevenueDashboard,
} = require("../controllers/dashboard.controller");

router.get("/revenue", getRevenueDashboard);

module.exports = router;