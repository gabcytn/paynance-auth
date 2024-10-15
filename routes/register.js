module.exports = (connection) => {
  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcrypt");

  router.post("/", (req, res) => {
    const body = req.body;

    bcrypt.hash(body.password, 10, (err, hash) => {
      try {
        connection.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [body.email, hash],
          (err) => {
            if (err) {
              res.contentType("application/json");
              res.send({
                message: "Duplicate",
              });
              return;
            }
            res.status(200);
            res.contentType("application/json");
            res.send({
              message: "ok",
            });
          }
        );
      } catch (e) {
        console.error(e);
      }
    });
  });

  return router;
};
