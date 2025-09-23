import { config } from "../../knexfile.ts";
import knex from "knex";

export const database = knex(config);
