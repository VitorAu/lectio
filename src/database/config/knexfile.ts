import path from "path";
import { fileURLToPath } from "url";
import type { Knex } from "knex";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(__dirname, "../migrations"),
      extension: "ts",
    },
  },
};

export default config;
