require("dotenv").config();

const passport = require("passport");

const JWT_SECRET = process.env.JWT_SECRET;
// create model for for User object and import

var DiscordStrategy = require('passport-discord').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.userId);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})


var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes
},
function(accessToken, refreshToken, profile, cb) {
    console.log({accessToken, refreshToken, profile});
    // User.findOrCreate({ discordId: profile.id }, function(err, user) {
    //     return cb(err, user);
    // });
}));