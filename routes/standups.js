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
      const dailyStandup = await getDailyStandup();
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

router.post("/join", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("User is not authenticated.");
    }

    let userId = req.session.passport.user;
    let selectedStandup = await getDailyStandup();
    console.log('does it exist: ', selectedStandup, selectedStandup._id, selectedStandup.id);
    if (!selectedStandup) {
      // create and add user to standup members
      selectedStandup = await createStandup();
    }

    let updatedStandup = await prisma.standUps.update({
      where: {
        id: selectedStandup.id
      },
      data: {
        standupMembers: {
          push: {
            usersId: userId,
            tasks: []
          }
        }
      }
    });
    return updatedStandup;
  } catch (err) {
    console.error(err);
  }
})

async function getDailyStandup() {
  const standup = await prisma.standUps.findFirst({
    where: {
      date: new Date().toLocaleDateString()
    },
    select: {
      id: true,
      standupMembers: true,
      date: true
    }
  });
  return standup;
}

module.exports = router;
