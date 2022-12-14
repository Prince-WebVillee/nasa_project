const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "Us enterprise",
    rocket: "NCC 1701D",
    target: "Kepler 442f",
    launchDate: "January 8, 2023",
  };
  const launchDataWithoutDate = {
    mission: "Us enterprise",
    rocket: "NCC 1701D",
    target: "Kepler 442f",
  };

  const launchDateWithInvalidDate = {
    mission: "Us enterprise",
    rocket: "NCC 1701D",
    target: "Kepler 442f",
    launchDate: "zoot",
  };

  test("It should respond with 201 created ", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("it should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
//   test("it should catch invalid dates", async () => {
//     const response = await request(app)
//       .post("/launches")
//       .send(launchDateWithInvalidDate)
//       .expect("Content-Type", /json/)
//       .expect(400);
//     expect(response.body).toStrictEqual({
//       error: "Invalid launch Date",
//     });
//   });




});
