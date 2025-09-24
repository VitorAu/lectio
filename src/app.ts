import { BuildServer } from "./server.ts";

const server = BuildServer();
const PORT = 8000;

async function InitializeApp() {
  try {
    await server.listen({ port: PORT }).then(() => {
      server.log.info("🚀 HTTP server is running");
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

InitializeApp();
