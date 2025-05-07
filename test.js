import { PrismaClient } from "./generated/index.js";
import { PrismaClient as PrismaClientQC } from "./generatedQC/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

async function createData() {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    });
    
    const prisma = new PrismaClient({ adapter });
    await prisma.$connect();
    
    // Create a user
    const user = await prisma.user.create({
        data: {}
    });
    
    // Create two posts linked to the user
    await prisma.post.create({
        data: {
            title: "First Post",
            authorId: user.id
        }
    });
    
    await prisma.post.create({
        data: {
            title: "Second Post", 
            authorId: user.id
        }
    });

    await prisma.email.create({
        data: {
            email: "test@test.com",
            userId: user.id
        }
    });

    await prisma.$disconnect();
}

async function queryWithoutQC() {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    });
    
    const prisma = new PrismaClient({ adapter });
    await prisma.$connect();

    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true,
            emails: true
        }
    });

    await prisma.$disconnect();

    return usersWithPosts;
}

async function queryWithQC() {
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL,
    });
    
    const prisma = new PrismaClientQC({ adapter });
    await prisma.$connect();


    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true,
            emails: true
        }
    });

    await prisma.$disconnect();

    return usersWithPosts;
}

await createData();

console.log("Querying without Query Compiler");

const result = await queryWithoutQC();
console.log(JSON.stringify(result, null, 2));

console.log("Querying with Query Compiler");

const resultQC = await queryWithQC();
console.log(JSON.stringify(resultQC, null, 2));
