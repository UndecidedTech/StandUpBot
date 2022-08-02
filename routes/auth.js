const express = require("express");
const passport = require("passport");

const router = express.Router();


router.get("/", passport.authenticate("discord"));
router.get("/redirect", passport.authenticate("discord", {
    failureRedirect: "/forbidden"
}), (req, res) => {
    res.redirect(process.env.NODE_ENV === "production" ? "https://standupbotapp.herokuapp.com/tasks" : "http://localhost:3000/tasks");
})

module.exports = router;