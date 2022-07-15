const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { client } = require("./bot");

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
