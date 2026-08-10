const express = require("express");

const {
  applyJob,
  getApplicationsByJob,
  shortlistApplication,
} = require("../controllers/application.controller");

const {
  getApplicationStatus,
} = require("../controllers/status.controller");

const router = express.Router();

router.post("/", applyJob);
router.get("/job/:jobId", getApplicationsByJob);
router.patch("/:applicationId/shortlist", shortlistApplication);
router.get("/:applicationId/status", getApplicationStatus);

module.exports = router;