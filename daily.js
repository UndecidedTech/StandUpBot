const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function createStandup() {
    await prisma.$connect()

    const newStandup = await prisma.standUps.create({
        data: {
            date: new Date().toLocaleDateString(),
            standupMembers: []
        }
    })
    return newStandup;
}

let createdStandup = createStandup();
console.log(createdStandup);

