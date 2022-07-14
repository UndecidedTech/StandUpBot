require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const connectMongo = require("./connect");

connectMongo();

const app = express();
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

app.listen(port, () => console.log(`server started on ${port}`));
