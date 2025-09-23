import fastify from "fastify";

const PORT = 8000;
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

async function initializeApp() {
  try {
    await server.listen({ port: PORT }).then(() => {
      server.log.info("🚀 HTTP server is running");
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

initializeApp();
