import fp from "fastify-plugin";
import { PrismaClient } from "../../prisma/client/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export default fp(async (fastify) => {  
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });

  const prisma = new PrismaClient({
    errorFormat: "pretty",
    adapter,
    transactionOptions: {
      maxWait: 10000, //  10 seconds
      timeout: 15000, //  15s
    },
  });
  fastify.decorate("prisma", prisma);  
  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
});
