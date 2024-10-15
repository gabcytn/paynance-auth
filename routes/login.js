module.exports = (connection, bcrypt) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", (req, res) => {
    const body = req.body;

    try {
      connection.query(
        "SELECT password FROM users WHERE email = ?",
        [body.email],
        (err, rows) => {
          if (rows.length !== 0) {
            bcrypt.compare(body.password, rows[0].password, (err, result) => {
              if (result === true) {
                res.status(200).json({ message: "ok" });
                return;
              } else {
                res.status(401).json({ message: "failed" });
              }
            });
          } else {
            res.status(404).json({ message: "failed" });
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
