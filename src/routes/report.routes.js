const express = require("express");
const router = express.Router();

const {
  getCollegeOverview
} = require("../controllers/report.controller");

router.get(
  "/:collegeId/reports/overview",
  getCollegeOverview
);

module.exports = router;