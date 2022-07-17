const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createStandup = require("../daily");

const router = express.Router();

router.get("/", async (req, res) => {
    // TODO check auth when we can integrate auth with frontend (it's a disaster)
    // if (!req.isAuthenticated()) {
    //   return res.status(401).send('User is not authenticated');
    // }
    try {
      const dailyStandup = await prisma.standUps.findFirst({
        where: {
          date: new Date().toLocaleDateString()
        },
        select: {
          standupMembers: true,
          date: true
        }
      })

    if (!dailyStandup) {
      // send message to channel or just reuse the create Standup function I expose from daily.js
      console.log("Daily standup hasn't been created yet, create it and send standup message to users");
      const newStandup = await createStandup()
      return res.send(newStandup);
    }

    return res.send(dailyStandup);
    } catch (e) {
      console.error(e);
    }
});


module.exports = router;
