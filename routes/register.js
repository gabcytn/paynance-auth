module.exports = (connection) => {
  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcrypt");

  router.post("/", (req, res) => {
    const body = req.body;

    bcrypt.hash(body.password, 10, (_, hash) => {
      try {
        connection.query(
          "INSERT INTO users (email, password) VALUES (?, ?)",
          [body.email, hash],
          (err) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "duplicate" });
              }
              return res.status(500).json({ message: "Database error" });
            }
            return res.status(200).json({ message: "ok" });
          }
        );
      } catch (e) {
        console.error(e);
      }
    });
  });

  return router;
};
