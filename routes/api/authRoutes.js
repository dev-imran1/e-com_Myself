const express = require("express");
const router = express.Router();
const registrationControllers = require('../../controllers/registrationControllers');
const otpControllers = require("../../controllers/verify");

router.post("/registration",registrationControllers );
router.post("/verify",otpControllers );

module.exports = router;
