const {
  httpGetAllLaunches,
  httpAddNewLaunch,
} = require("./launches.controller");
const express = require("express");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);

module.exports = launchesRouter;
