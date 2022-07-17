require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const passport = require("passport");

const JWT_SECRET = process.env.JWT_SECRET;
// create model for for User object and import

var DiscordStrategy = require("passport-discord").Strategy;

passport.serializeUser(function (user, done) {
  console.log("did I make it here:", user.id);
  done(null, user.id);

});

passport.deserializeUser(function (user, done) {
  done(null, user.id);
});

var scopes = ["identify", "email", "guilds", "guilds.join"];

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
      const user = await prisma.users.findFirst({
        where: { discordId: profile.id }
      });

      // if user exists return existing user
      if (user) {
        console.log("user exists: ", user);
        return done(null, user);
      }

      // if user doesn't exist, create in DB
      let newUser = await prisma.users.create({
        data: {
          discordId: profile.id,
          username: profile.username,
          avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpg`,
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      });
      console.log("Creating user: ", newUser);
      return done(null, newUser);
    }
  )
);
