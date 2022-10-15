const express = require("express");

const { addComment, getAllComments } = require("../controller/comments");

const commentRouter = express.Router();

commentRouter.post("/add/:user_id", addComment);
commentRouter.get("/get/:item_id", getAllComments);

module.exports = commentRouter;
