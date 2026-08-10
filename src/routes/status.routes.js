const express = require("express");

const {
  getApplicationStatus,
} = require("../controllers/status.controller");

const router = express.Router();

router.get("/:applicationId", getApplicationStatus);

module.exports = router;
