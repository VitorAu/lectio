import { database } from "../database/knex.ts";
import type { IUser } from "../interfaces/user.ts";
import bcrypt from "bcrypt";

export class UserModel {
  private table = "users";

  async create(data: Omit<IUser, "id" | "deleted_at">) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
    const res = await database<IUser>(this.table).insert(data).returning("*");
    return res;
  }

  async updateInfo(id: string, data: Partial<IUser>) {
    const res = await database<IUser>(this.table)
      .where({ id })
      .whereNull("deleted_at")
      .update(data)
      .returning("*");
    return res;
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await database<IUser>(this.table)
      .where({
        id,
      })
      .whereNull("deleted_at")
      .first<IUser>();

    if (!user) throw new Error("User not found");
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) throw new Error("Incorrect password");

    const res = await database<IUser>(this.table)
      .where({ id })
      .whereNull("deleted_at")
      .update({ password: newPassword });
    return res;
  }

  async findById(id: string) {
    const res = await database(this.table)
      .where({ id })
      .whereNull("deleted_at")
      .first();
    return res;
  }

  async findByEmail(email: string) {
    const res = await database(this.table)
      .where({ email })
      .whereNull("deleted_at")
      .first();
    return res;
  }

  async findByUsername(username: string) {
    const res = await database(this.table)
      .whereILike("username", `%${username}%`)
      .whereNull("deleted_at")
      .limit(50);
    return res;
  }

  async findAll() {
    const res = await database(this.table).whereNull("deleted_at");
    return res;
  }

  async delete(id: string) {
    const res = await database(this.table)
      .where({ id, deleted_at: null })
      .update({ deleted_at: new Date() });
    return res;
  }
}
