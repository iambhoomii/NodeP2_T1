const express = require("express");

const router = express.Router();

const {
  generateOffer,
  chooseESign,
  verifyOffer,
} = require("../controllers/offer.controller");


router.post("/generate", generateOffer);

router.patch("/:offerId/esign", chooseESign);

router.post("/:offerId/verify", verifyOffer);


module.exports = router;

