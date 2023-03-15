import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function main() {
    const start = new Date()
    const end = new Date()
    end.setDate(end.getDate() + 7)
    await prisma.trip.create({
        data: {
            start: start,
            end: end,
            origin: "Monterey, California",
            destination: "Santa Barbara, California",
        },
    })

    const allUsers = await prisma.trip.findMany()
    console.dir(allUsers, { depth: null })
}

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })
