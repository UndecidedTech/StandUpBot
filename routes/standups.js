const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      // check auth
      // if (!req.isAuthenticated()) {
      //   return res.status(401).send('User is not authenticated');
      // }
      try {
        const dailyStandup = await prisma.standUps.findFirst({
          where: {
            date: new Date().toLocaleDateString()
          }
        })
      } catch (e) {

      }
      return res.send(dailyStandup);
    } catch (e) {
        console.log(e)
        return res.status(401).send({
          message: 'No user is signed in.'
        });
    }
});

module.exports = router;