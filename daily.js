require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
const generateMessage = require("./markup.js");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

async function createStandup() {
  await prisma.$connect()

  const channel = client.channels.cache.get(process.env.CHANNEL_ID);

  const standupFirst = await prisma.standUps.create({
      data: {
          date: new Date().toLocaleDateString(),
          messageId: ""
      }
  })

  let message = await channel.send(generateMessage(standupFirst));
  const newStandup = await prisma.standUps.update({
    where: {
      id: standupFirst.id
    },
    data: {
      messageId: message.id
    }
  })

  return newStandup
}

module.exports = { createStandup, client }
