module.exports = (connection, bcrypt) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", (req, res) => {
    const body = req.body;

    connection.query(
      "SELECT password FROM users WHERE email = ?",
      [body.email],
      (err, rows) => {
        bcrypt.compare(body.password, rows[0].password, (err, result) => {
          if (result === true) {
            res.status(200).json({ message: "ok" });
          } else {
            res.status(401).json({ message: "failed" });
          }
        });
      }
    );
  });

  return router;
};
