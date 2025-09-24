import { ImportMock } from "ts-mock-imports";
import { IUser } from "../src/interfaces/user.ts";
import { UserModel } from "../src/models/user.ts";
import { BuildServer } from "../src/server.ts";
import { test } from "tap";
import bcrypt from "bcrypt";

test("POST `/api/auth/register` - create user with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockData: IUser = {
    id: "1",
    name: "test",
    username: "test",
    email: "test@test.com",
    birthdate: new Date("1990-05-15T03:00:00.000Z"),
    password: "test",
  };
  const stub = ImportMock.mockFunction(UserModel.prototype, "create", [
    mockData,
  ]);

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "POST",
    url: `/api/auth/register`,
    payload: mockData,
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User created successfully");
  t.ok(
    typeof json.data === "object" && json.data !== null,
    "data should be an object"
  );

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("POST `/api/auth/login` - login user with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockEmail = "test@test.com";
  const mockPassword = "test";
  const hashedMockPassword = await bcrypt.hash(mockPassword, 12);
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: hashedMockPassword,
    },
  ];
  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "findByEmail",
    mockData[0]
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "POST",
    url: `/api/auth/login`,
    payload: {
      email: mockEmail,
      password: mockPassword,
    },
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User login successfull");
  t.ok(json.data.accessToken, "should return an accessToken");
  t.ok(json.data.refreshToken, "should return a refreshToken");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("POST `/api/auth/refresh` - refresh token", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockData = { sub: "1", email: "test@test.com" };
  const mockRefreshToken = fastify.jwt.sign(mockData, { expiresIn: "7d" });

  const response = await fastify.inject({
    method: "POST",
    url: "/api/auth/refresh",
    payload: { refreshToken: mockRefreshToken },
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "Token refreshed");
  t.ok(json.data.accessToken, "should return a new accessToken");

  console.log("🔄 Refresh response:", JSON.stringify(json, null, 2));

  await fastify.close();
});
