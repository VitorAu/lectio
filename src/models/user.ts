import { IUser } from "@/interfaces/user.ts";
import { database } from "@/database/knex.ts";
import knex from "knex";

export class UserModel {
  private table = "users";

  async create(user: Omit<IUser, "id" | "deleted_at">) {
    const res = await knex(this.table).insert(user).returning("*");
    return res;
  }

  async updateInfo(id: string, data: Partial<IUser>) {
    const res = await knex(this.table)
      .where({ id, deleted_at: null })
      .update(data)
      .returning("*");
    return res;
  }

  async findById(id: string) {
    const res = await knex(this.table).where({ id, deleted_at: null }).first();
    return res;
  }

  async findByEmail(email: string) {
    const res = await knex(this.table)
      .where({ email, deleted_at: null })
      .first();
    return res;
  }

  async findByUsername(username: string) {
    const res = await knex(this.table)
      .whereILike("username", `%${username}%`)
      .andWhere({ deleted_at: null })
      .limit(50);
    return res;
  }

  async findAll() {
    const res = await knex(this.table).where({ deleted_at: null });
    return res;
  }

  async delete(id: string) {
    const res = await knex(this.table)
      .where({ id, deleted_at: null })
      .update({ deleted_at: new Date() });
  }
}
