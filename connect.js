const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connectMongo() {
  await prisma.$connect();
}

module.exports = connectMongo;
