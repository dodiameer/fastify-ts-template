import { config as dotenv } from "dotenv";
import Fastify from "fastify";
import fastifyNow from "fastify-now";
import { resolve } from "path";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyPrisma from "plugins/prisma";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

dotenv();

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const fastify = Fastify({
  logger: {
    level: IS_PRODUCTION ? "info" : "debug",
    transport: IS_PRODUCTION
      ? undefined
      : {
          target: "pino-pretty",
        },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(fastifyNow, {
  routesFolder: resolve("routes"),
});

await delay(100);

await fastify.register(fastifyPrisma);

await fastify.listen({ port: Number(process.env.PORT || 3000) });
