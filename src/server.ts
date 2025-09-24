import { UserRoutes } from "./routes/user.ts";
import { AuthRoutes } from "./routes/auth.ts";
import fastify from "fastify";
import jwt from "@fastify/jwt";

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

  server.register(jwt, { secret: String(process.env.JWT_SECRET) });
  
  server.register(UserRoutes, { prefix: "/api/users" });
  server.register(AuthRoutes, { prefix: "/api/auth" });

  return server;
}
