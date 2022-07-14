const express = require("express");
const passport = require("passport");

const router = express.Router();


router.get("/", passport.authenticate("discord"));
router.get("/redirect", passport.authenticate("discord", {
    failureRedirect: "/forbidden"
}), (req, res) => {
    console.log(req.body);
    console.log(req);
    res.redirect("http://localhost:3000/tasks");
})

module.exports = router;