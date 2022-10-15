const connection = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = bcrypt.genSaltSync(5);

const createNewUser = async (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  const username = req.body.username;
  var encryptedPassword = await bcrypt.hashSync(password, saltRounds);
  const query =
    "INSERT INTO users (first_name,last_name,password,username) VALUES (?,?,?,?)";
  const data = [first_name, last_name, encryptedPassword, username];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(409).json({
        success: false,
        message: "something went wrong!",
        error: err,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user was made successfuly",
        result: result,
      });
    }
  });
};

module.exports = { createNewUser };
