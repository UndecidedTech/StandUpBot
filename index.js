require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport")
const cors = require("cors");
const DiscordStrategy = require("./strategies/discordstrategy");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    "origin": ["http://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());
app.use("/image", express.static("image"));
app.use("/", express.static("./public"));
app.use(session({
    secret: "DanIsTheMan",
    cookie: {
        maxAge: 60000 * 60 * 24 
    },
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

// routes and paths
const auth = require("./routes/auth");
app.use("/auth", auth);

const users = require("./routes/users");
app.use("/users", users);

const standups = require("./routes/standups");
app.use("/api/standups", standups);

app.listen(port, () => console.log(`server started on ${port}`))
