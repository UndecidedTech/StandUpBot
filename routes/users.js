require("dotenv").config();
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/discord", passport.authenticate("discord"));

module.exports = router;