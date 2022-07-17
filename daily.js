require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
async function createStandup() {
  await prisma.$connect()
  
  const todayStandup = await prisma.standUps.findFirst({
    where: {
      date: new Date().toLocaleDateString()
    }
  })

  if (!todayStandup){
    await prisma.standUps.create({
        data: {
            date: new Date().toLocaleDateString(),
            standupMembers: []
        }
    })
  }

  // channelId move to env 
  const channel = client.channels.cache.get('989527711783477339');
  channel.send('New Standup');

  console.log("Daily standup created :DDD");
}

module.exports = createStandup
