const express = require("express");
const router = express.Router();

const {
  createCollegeAdmin
} = require("../controllers/collegeAdmin.controller");

router.post("/", createCollegeAdmin);

module.exports = router;