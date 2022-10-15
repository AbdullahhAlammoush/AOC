const express = require("express");
const { getMyItems, getOneItem } = require("../controller/items");
const myItemsRouter = express.Router();

myItemsRouter.get("/getMyItems/:user_id", getMyItems);
myItemsRouter.get("/getOneItem/:item_id", getOneItem);

module.exports = myItemsRouter;
