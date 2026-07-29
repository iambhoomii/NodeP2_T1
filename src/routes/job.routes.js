const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobById,
  searchJobs,
} = require("../controllers/job.controller");

// Search jobs
router.get("/search", searchJobs);

// Get job by ID
router.get("/:id", getJobById);

// Create a job
router.post("/", createJob);

module.exports = router;