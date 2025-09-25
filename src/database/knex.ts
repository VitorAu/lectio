import knex from "knex";
import config from "./config/knexfile.ts";

export const database = knex(config.development);
