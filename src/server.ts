import { UserRoutes } from "./routes/user.ts";
import fastify from "fastify";

export function BuildServer() {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid, hostname",
        },
      },
    },
  });

  server.register(UserRoutes, { prefix: "/api/users" });

  return server;
}
