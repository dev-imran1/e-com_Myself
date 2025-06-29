const express = require("express");
const router = express.Router();
const registrationControllers = require('../../controllers/registrationControllers');
const otpControllers = require("../../controllers/verify");
const loginController = require("../../controllers/loginController");

router.post("/registration",registrationControllers );
router.post("/verify",otpControllers );
router.post("/login",loginController );

module.exports = router;
