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

passport.deserializeUser(function (id, done) {
  console.log("DESERIALIZE: ", id);
  done(null, id);
});

var scopes = ["identify", "email", "guilds", "guilds.join"];

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? "https://standupbotapp.herokuapp.com/api/auth/redirect"
          : "http://localhost:5000/api/auth/redirect",
      scope: scopes,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
      const user = await prisma.users.findFirst({
        where: { discordId: profile.id },
      });

      // if user exists return existing user
      if (user) {
        console.log("user exists: ", user);
        let updatedUser = await prisma.users.update({
          where: { id: user.id },
          data: {
            avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpg`,
            username: profile.username,
          },
        });
        return done(null, updatedUser);
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
