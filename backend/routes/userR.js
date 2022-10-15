const express = require("express");

const { createNewUser } = require("../controller/user");

const userRouter = express.Router();
//the main route is user
userRouter.post("/add", createNewUser);

module.exports = userRouter;
