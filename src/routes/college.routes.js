const express = require("express");
const router = express.Router();

const { createCollege } = require("../controllers/college.controller");

router.post("/", createCollege);

module.exports = router;