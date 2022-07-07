import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

const client = new PrismaClient();
await client.$connect();

declare module "fastify" {
  interface FastifyRequest {
    prisma: typeof client;
  }
}

const fastifyPrisma = fp(async (fastify) => {
  fastify.addHook("preHandler", async (request, reply) => {
    request.prisma = client;
  });
  return fastify;
});

export default fastifyPrisma;
