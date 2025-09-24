import type { IResponse } from "../interfaces/response.ts";
import type { IUser } from "../interfaces/user.ts";
import type { FastifyInstance } from "fastify";
import { UserModel } from "../models/user.ts";
import bcrypt from "bcrypt";

const userModel = new UserModel();

export async function UserRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (_, res): Promise<IResponse> => {
    try {
      const response = await userModel.findAll();
      return res.code(200).send({
        status: "success",
        message: "Users found successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to find users",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.get("/:id", async (req, res): Promise<IResponse> => {
    try {
      const { id } = req.params as { id: string };
      const response = await userModel.findById(id);

      return res.code(200).send({
        status: "success",
        message: "User found successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to find user",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.get("/email/:email", async (req, res): Promise<IResponse> => {
    try {
      const { email } = req.params as { email: string };
      const response = await userModel.findByEmail(email);

      return res.code(200).send({
        status: "success",
        message: "User found successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to find user",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.get("/username/:username", async (req, res): Promise<IResponse> => {
    try {
      const { username } = req.params as { username: string };
      const response = userModel.findByUsername(username);

      return res.code(200).send({
        status: "success",
        message: "User found successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to find user",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.patch("/:id", async (req, res): Promise<IResponse> => {
    try {
      const { id } = req.params as { id: string };
      const data = req.body as Omit<Partial<IUser>, "id" | "deleted_at">;
      const response = await userModel.updateInfo(id, data);

      return res.code(200).send({
        status: "success",
        message: "User info updated successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to update user info",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.put("/:id/password", async (req, res): Promise<IResponse> => {
    try {
      const { id } = req.params as { id: string };
      const { oldPassword, newPassword } = req.body as {
        oldPassword: string;
        newPassword: string;
      };

      if (!oldPassword || !newPassword) {
        return res.code(400).send({
          status: "success",
          message: "Missing required fields",
        } satisfies IResponse);
      }

      const response = await userModel.updatePassword(
        id,
        oldPassword,
        newPassword
      );

      return res.code(200).send({
        status: "success",
        message: "User password updated successfully",
        data: response,
      } satisfies IResponse);
    } catch (err) {
      return res.status(500).send({
        status: "error",
        message: "Failed to update user password",
        error: String(err),
      } satisfies IResponse);
    }
  });
}
