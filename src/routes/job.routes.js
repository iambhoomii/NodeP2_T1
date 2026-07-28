const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobById,
} = require("../controllers/job.controller");

router.post("/", createJob);
router.get("/:id", getJobById);

module.exports = router;