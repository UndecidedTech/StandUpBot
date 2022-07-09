require("dotenv").config();
const express = require("express");
const Users = require("../prisma") 

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get('/current-username', async (req, res) => {
    try {
      res.set('Cache-Control', 'no-store, no-cache');
  
      if (!req.isAuthenticated()) {
        return res.status(401).send('User is not authenticated');
      }
      try {
        const userId = req.session.passport.user;
        let user = null;
  
        if (typeof userId !== 'undefined') { // implement new query w/ primsa format
          const user = await prisma.users.findUnique({
            where: {
              id: userId,
            },
            select: {
              username: true,
              discordId: true,
              avatar: true
            }
          })
        }
  
        if (!user) {
          throw new Error({ message: 'No user with this user id.' });
        }
  
        return res.send(user);
      } catch (e) {
        return req.session.destroy(() => {
          res.status(500).send({
            message: e
          });
        });
      }
    } catch {
      return res.status(401).send({
        message: 'No user is signed in.'
      });
    }
  });

module.exports = router;