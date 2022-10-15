const connection = require("../database/db");

const addComment = (req, res) => {
  const user_id = req.params.user_id;
  const { comment, e } = req.body;
  const query = `INSERT INTO comments (text,item_id,user_id) VALUES (?,?,?)`;
  const data = [comment, e, user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "The comment was Not added!",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "The comment was added",
        result: result,
      });
    }
  });
};

const getAllComments = (req, res) => {
  const item_id = req.params.item_id;

  const query = `SELECT * FROM comments WHERE item_id=?`;
  const data = [item_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "No comments were fetched",
        result: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "All comments were fetched",
        result: result,
      });
    }
  });
};
module.exports = { addComment, getAllComments };
