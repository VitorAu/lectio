import type { Knex } from "knex";
import "dotenv/config"

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
  },
};


export default config;
