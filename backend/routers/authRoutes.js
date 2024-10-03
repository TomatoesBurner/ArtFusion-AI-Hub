const express = require("express");

const router = express.Router();

router.post("/verifyTwoFactor");

router.post("/enableTwoFactor");

module.exports = router;
