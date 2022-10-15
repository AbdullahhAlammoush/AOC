const express = require("express");
const {
  addItmes,
  editeItmes,
  getAllItems,
  deleteItems,
} = require("../controller/items");
const itemsRouter = express.Router();

itemsRouter.post("/add/:user_id", addItmes);
itemsRouter.post("/edite/:id", editeItmes);
itemsRouter.delete("/delete/:id", deleteItems);
itemsRouter.get("/get", getAllItems);

module.exports = itemsRouter;
