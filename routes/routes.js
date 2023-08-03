const express = require("express");
const { getData } = require("../controller/getData");
const { cacheData } = require("../middleware/cachedData");

const route = express.Router();

const usersRoute = route.get("/users", cacheData, getData);

module.exports = { usersRoute };
