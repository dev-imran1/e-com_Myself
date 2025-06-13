const express = require("express");
const router = express.Router();
const registrationControllers = require('../../controllers/registrationControllers')

router.post("/registration",registrationControllers );

module.exports = router;
