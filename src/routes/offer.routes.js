const express = require("express");

const router = express.Router();

const {
  generateOffer,
  chooseESign,
} = require("../controllers/offer.controller");

router.post("/generate", generateOffer);
router.patch("/:offerId/esign", chooseESign);

module.exports = router;