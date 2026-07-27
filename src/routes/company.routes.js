const express = require("express");
const {
  signupCompany,
  getCompanyById,
} = require("../controllers/company.controller");

const router = express.Router();

router.post("/signup", signupCompany);
router.get("/:id", getCompanyById);

module.exports = router;