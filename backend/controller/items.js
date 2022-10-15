const connection = require("../database/db");
const addItmes = (req, res) => {
  const owner_id = req.params.user_id;
  const { name_of_item, price, item_image } = req.body;
  const query =
    "INSERT INTO items (name_of_item, price, owner_id,item_image) VALUES (?,?,?,?)";
  const data = [name_of_item, price, owner_id, item_image];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "The items were NOT added!",
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The items were added successfuly",
        result: result,
      });
    }
  });
};

const editeItmes = (req, res) => {
  const id = req.params.id;

  const { newName, newPrice } = req.body;
  const query = "UPDATE items SET name_of_item=?, price=? WHERE id=? ";
  const data = [newName, newPrice, id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "The items were NOT edited!",
        err: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The items were edited successfuly",
        result: result,
      });
    }
  });
};

const deleteItems = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM items WHERE id=?";
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "The Items were Not deleted!",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The Items were deleted successfuly",
        result: result,
      });
    }
  });
};
const getAllItems = (req, res) => {
  const query = "SELECT * FROM items";
  connection.query(query, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "No Items were fetched!",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All Items were fetched successfuly",
        result: result,
      });
    }
  });
};

const getMyItems = (req, res) => {
  const owner_id = req.params.user_id;

  const query = "SELECT * FROM items WHERE owner_id=?";
  const data = [owner_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "No Items were fetched!",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All Items were fetched successfuly",
        result: result,
      });
    }
  });
};
const getOneItem = (req, res) => {
  const item_id = req.params.item_id;

  const query = "SELECT * FROM items WHERE id=?";
  const data = [item_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "No Items were fetched!",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All Items were fetched successfuly",
        result: result,
      });
    }
  });
};
module.exports = {
  addItmes,
  editeItmes,
  deleteItems,
  getAllItems,
  getMyItems,
  getOneItem,
};
