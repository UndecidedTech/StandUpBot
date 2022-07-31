require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createStandup, client } = require("../daily");
const { generateMessage } = require("../markup");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send('User is not authenticated');
    }

    const dailyStandup = await getDailyStandup();
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
    // let currUser = await prisma.users.findFirst({
    //   where: {
    //     id: userId,
    //   },
    // });

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
            id: true
          },
        },
      },
    });

    
    // invoke generate message
    await updateMessage(updatedStandup)

    return res.send(updatedStandup);
  } catch (err) {
    console.error(err);
  }
});

router.put("/task", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("User is not authenticated.");
    }

    let userId = req.session.passport.user;
    let taskId = req.body.id;
    let nCompleted = req.body.completed;
    let nLabel = req.body.label;
    // update current standup with req.body
    let update = {};

    if (nCompleted) {
      update["completed"] = nCompleted;
    }
    if (nLabel) {
      update["label"] = nLabel;
    }

    await prisma.tasks.update({
      where: {
        id: taskId
      },
      data: update,
    });

    // invoke generate message
    let updatedStandup = await getDailyStandup();
    await updateMessage(updatedStandup)
    
    return res.send(updatedStandup);
  }catch(err) {
    console.error(err)
  }
})

router.post("/task", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("User is not authenticated.");
    }

    let userId = req.session.passport.user;
    let standupMemberId = req.body.id;
    // update current standup with req.body
    let updatedStandupMembers = await prisma.standUpMembers.update({
      where: {
        id: standupMemberId
      },
      data: {
        tasks: {
          create: {
            label: req.body.label,
            completed: false
          },
        },
      },
    });

    const standup = await getDailyStandup();
    updateMessage(standup);

    console.log(updatedStandupMembers);
    return res.send(updatedStandupMembers);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/task", async (req,res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).send("User is not authenticated.");
    }

    let userId = req.session.passport.user;
    let taskId = req.params.taskId; 

    await prisma.tasks.delete({
      where: {
        id: taskId
      }
    })
    
    let updatedStandup = await getDailyStandup();
    return res.send(updatedStandup);
  } catch(err) {
    console.error(err);
  }
})

async function getDailyStandup() {
  let standup = await prisma.standUps.findFirst({
    where: {
      date: new Date().toLocaleDateString(),
    },
    include: {
      standupMembers: {
        select: {
          user: true,
          tasks: true,
          id: true
        },
      },
    },
  });

  if (!standup) {
    console.log("Couldn't find todays standup, making a new one")
    standup = await createStandup();
  }

  return standup;
}

async function updateMessage (standup) {
  const channel = await client.channels.cache.get(process.env.CHANNEL_ID);
  const message = await channel.messages.fetch(standup.messageId);
  console.log("is message fetch working?: ", message);
  message.edit(generateMessage(standup));
}

module.exports = router;
