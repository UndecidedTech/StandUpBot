require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const schedule = require('node-schedule');
const { createStandup } = "./daily.js";
const DiscordStrategy = require("./strategies/discordstrategy");

var MongoDBStore = require('connect-mongodb-session')(session);

var app = express();
var store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: "DanIsTheMan",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

const connectMongo = require("./connect");

connectMongo();

const port = process.env.PORT || 5000;

app.use(cors({
    "origin": ["http://localhost:3000"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));
app.use(cookieParser());
app.use(express.json());
app.use("/image", express.static("image"));
app.use("/", express.static("./public"));
app.use(
  session({
    secret: "DanIsTheMan",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes and paths
const auth = require("./routes/auth");
app.use("/api/auth", auth);

const users = require("./routes/users");
app.use("/api/users", users);

const standups = require("./routes/standups");
app.use("/api/standups", standups);


// schedule daily creation of standups
// responsible for creating in the at midnight and then also checking that one hasn't already been created
// TODO use /api/standups to check if there is a standup for that day, if not create it for safety because I don't trust this
const job = schedule.scheduleJob('0 0 0 * *', () => createStandup());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./frontend/standups/build/"));
}

app.listen(port, () => console.log(`server started on ${port}`));
