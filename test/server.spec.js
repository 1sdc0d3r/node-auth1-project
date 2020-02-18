const request = require("supertest");
const server = require("./testServer");

describe("server.js", () => {
  describe("server route", () => {
    it("should return status code 200 from route", async () => {
      const expectedStatusCode = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object", async () => {
      const response = await request(server).get("/");
      expect(response.type).toEqual("application/json");
    });

    it("should return a JSON object", async () => {
      const expectedBody = { api: "up" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("GET /users", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get("/api/users");
      const expectedStatusCode = 200;
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return an array of single user", async () => {
      const expectedBodyLength = 1;
      const response = await request(server).get("/api/users");

      expect(response.body).toHaveLength(expectedBodyLength);
    });
  });
  describe("GET /users/:id", () => {
    it("should return single user", async () => {
      const expectedBody = {};
      const response = request(server).get("/api/users/:id");
      expect(response.body).toEqual(expectedBody);
    });
  });
});
