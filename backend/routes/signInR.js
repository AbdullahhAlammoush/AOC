const express = require("express");
const { signIn } = require("../controller/signIn");

const singInRouter = express.Router();
// the main route is "signIn"
singInRouter.post("/", signIn);

module.exports = singInRouter;
