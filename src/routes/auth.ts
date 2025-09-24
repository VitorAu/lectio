import type { IResponse } from "../interfaces/response.ts";
import type { IUser } from "../interfaces/user.ts";
import type { IAuth } from "../interfaces/auth.ts";
import type { FastifyInstance } from "fastify";
import { UserModel } from "../models/user.ts";
import bcrypt from "bcrypt";

const userModel = new UserModel();

export async function AuthRoutes(fastify: FastifyInstance) {
  fastify.post("/register", async (req, res): Promise<IResponse> => {
    try {
      const data = req.body as Omit<IUser, "id" | "deleted_at">;

      if (
        !data.name ||
        !data.username ||
        !data.email ||
        !data.birthdate ||
        !data.password
      ) {
        return res.code(400).send({
          status: "error",
          message: "Missing required fields",
        } satisfies IResponse);
      }

      const response = await userModel.create(data);
      const [user] = response;
      const { password, ...removePasswordResponse } = user;

      return res.code(200).send({
        status: "success",
        message: "User created successfully",
        data: removePasswordResponse,
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to create user",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.post("/login", async (req, res): Promise<IResponse> => {
    try {
      const data = req.body as IAuth;

      const response = await userModel.findByEmail(data.email);
      if (!response) {
        return res.code(400).send({
          status: "error",
          message: "Invalid credentials",
        } satisfies IResponse);
      }

      const verifyPassword = await bcrypt.compare(
        data.password,
        response.password
      );
      if (!verifyPassword) {
        return res.code(400).send({
          status: "error",
          message: "Invalid credentials",
        } satisfies IResponse);
      }

      const accessToken = fastify.jwt.sign(
        { sub: response.id, email: response.email },
        { expiresIn: "15m" }
      );
      const refreshToken = fastify.jwt.sign(
        { sub: response.id, email: response.email },
        { expiresIn: "7d" }
      );

      return res.code(200).send({
        status: "success",
        message: "User login successfull",
        data: {
          accessToken,
          refreshToken,
        },
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to login",
        error: String(err),
      } satisfies IResponse);
    }
  });

  fastify.post("/refresh", async (req, res): Promise<IResponse> => {
    try {
      const { refreshToken } = req.body as { refreshToken: string };

      if (!refreshToken) {
        return res.code(400).send({
          status: "error",
          message: "Refresh token is required",
        } satisfies IResponse);
      }

      let payload: any;
      try {
        payload = fastify.jwt.verify(refreshToken);
      } catch (err) {
        return res.code(401).send({
          status: "error",
          message: "Invalid refresh token",
        } satisfies IResponse);
      }

      const newAccessToken = fastify.jwt.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: "15m" }
      );

      return res.code(200).send({
        status: "success",
        message: "Token refreshed",
        data: {
          accessToken: newAccessToken,
        },
      } satisfies IResponse);
    } catch (err) {
      return res.code(500).send({
        status: "error",
        message: "Failed to refresh token",
        error: String(err),
      } satisfies IResponse);
    }
  });
}
