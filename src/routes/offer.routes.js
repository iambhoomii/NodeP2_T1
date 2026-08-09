const express = require("express");

const router = express.Router();

const {
  generateOffer,
  chooseESign,
  verifyOffer,
} = require("../controllers/offer.controller");


router.post("/generate", generateOffer);

router.patch("/:offerId/esign", chooseESign);

router.get("/verify/:offerId", verifyOffer);


module.exports = router;

