const express = require("express");
const { getData } = require("../controller/getData");

const route = express.Router();

const usersRoute = route.get("/users", getData);

module.exports = { usersRoute };
