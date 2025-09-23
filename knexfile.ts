import type { Knex } from "knex";

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      port: Number(process.env.DB_PORT),
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
