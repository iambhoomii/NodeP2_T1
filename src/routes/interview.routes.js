const express = require("express");

const router = express.Router();

const {
  scheduleInterview,
} = require("../controllers/interview.controller");

router.post("/schedule", scheduleInterview);

module.exports = router;