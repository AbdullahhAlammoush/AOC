const connection = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signIn = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM users WHERE username=?`;
  const data = [username];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (wrong, response) => {
        if (wrong) {
          res.status(409).json({
            success: false,
            message: "something went wrong!",
            error: wrong,
          });
        } else if (response) {
          const payload = {
            first_name: result[0].first_name,
            user_id: result[0].id,
          };
          const option = {
            expiresIn: "1h",
          };
          const token = jwt.sign(payload, process.env.SECRET, option);
          res.status(200).json({
            success: response,
            message: `welcome Mr(s). ${result[0].first_name}`,
            token: token,
          });
        } else {
          res.status(403).json({
            success: response,
            message: "password does not match!",
          });
        }
      });
    }
  });
};
module.exports = { signIn };
