const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());

const db = require("./database/db");
const bodyParser = require("body-parser");
app.use(cors());

const PORT = 5000;

//importing routers

const userRouter = require("./routes/userR");
const singInRouter = require("./routes/signInR");
const itemsRouter = require("./routes/itemsR");
const myItemsRouter = require("./routes/myItemsR");
const commentRouter = require("./routes/commentR");

//routers middleware
app.use("/user", userRouter);
app.use("/signIn", singInRouter);
app.use("/items", itemsRouter);
app.use("/myItems", myItemsRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
