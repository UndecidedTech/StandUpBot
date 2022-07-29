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
    console.log("Am I here?");
    const dailyStandup = await getDailyStandup();
    if (!dailyStandup) {
      // send message to channel or just reuse the create Standup function I expose from daily.js
      console.log(
        "Daily standup hasn't been created yet, create it and send standup message to users"
      );
      const newStandup = await createStandup();
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
    let currUser = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    let selectedStandup = await getDailyStandup();
    let updatedStandup = await prisma.standUps.update({
      where: {
        id: selectedStandup.id,
      },
      data: {
        standupMembers: {
          create: {
            userId: userId,
          },
        },
      },
      include: {
        standupMembers: {
          select: {
            user: true,
            tasks: true,
          },
        },
      },
    });

    console.log("here: ", updatedStandup);
    return res.send(updatedStandup);
  } catch (err) {
    console.error(err);
  }
});

router.post("/task", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("User is not authenticated.");
    }

    let userId = req.session.passport.user;
    let standupId = req.body.standupId;
    // update current standup with req.body
    let updatedStandupMembers = await prisma.standUpMembers.update({
      where: {
        standUpsId: standupId,
        userId: userId,
      },
      data: {
        tasks: {
          create: {
            label: req.body.label,
          },
        },
      },
    });

    console.log(updatedStandupMembers);
    return res.send(updatedStandupMembers);
  } catch (err) {
    console.error(err);
  }
});

async function getDailyStandup() {
  const standup = await prisma.standUps.findFirst({
    where: {
      date: new Date().toLocaleDateString(),
    },
    include: {
      standupMembers: {
        select: {
          user: true,
          tasks: true,
        },
      },
    },
  });
  return standup;
}

module.exports = router;
