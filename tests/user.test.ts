import { ImportMock } from "ts-mock-imports";
import { IUser } from "../src/interfaces/user.ts";
import { UserModel } from "../src/models/user.ts";
import { BuildServer } from "../src/server.ts";
import { test } from "tap";

test("GET `/api/users` - find all users with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "findAll",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "GET",
    url: "/api/users",
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "Users found successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("GET `/api/users/:id` - find user by id with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockId = "1";
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "findById",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/api/users/${mockId}`,
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User found successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("GET `/api/users/email/:email` - find user by email with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockEmail = "test@test.com";
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "findByEmail",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/api/users/email/${mockEmail}`,
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User found successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("GET `/api/users/username/:username` - find user by username with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockUsername = "test";
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "findByUsername",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "GET",
    url: `/api/users/username/${mockUsername}`,
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User found successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("PATCH `/api/users/:id` - update user info with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockId = "1";
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "updateInfo",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "PATCH",
    url: `/api/users/${mockId}`,
    payload: {
      username: "v1t1n",
    },
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User info updated successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});

test("PUT `/api/users/:id/password` - update user password with mock data", async (t) => {
  const fastify = BuildServer();
  await fastify.ready();

  const mockId = "1";
  const mockData: IUser[] = [
    {
      id: "1",
      name: "test",
      username: "test",
      email: "test@test.com",
      birthdate: new Date("1990-05-15T03:00:00.000Z"),
      password: "test",
    },
  ];

  const stub = ImportMock.mockFunction(
    UserModel.prototype,
    "updatePassword",
    mockData
  );

  t.teardown(() => {
    fastify.close();
    stub.restore();
  });

  const response = await fastify.inject({
    method: "PUT",
    url: `/api/users/${mockId}/password`,
    payload: {
      oldPassword: "test",
      newPassword: "1234",
    },
  });

  const json = response.json();
  t.equal(response.statusCode, 200);
  t.equal(json.status, "success");
  t.equal(json.message, "User password updated successfully");
  t.ok(Array.isArray(json.data), "data should be an array");

  console.log("✨ Full response: " + JSON.stringify(json, null, 2));
});
