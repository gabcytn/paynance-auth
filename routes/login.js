module.exports = (connection, bcrypt) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", (req, res) => {
    const body = req.body;

    try {
      connection.query(
        "SELECT id, password FROM users WHERE email = ?",
        [body.email],
        (_, rows) => {
          if (rows.length === 0)
            return res.status(404).json({ message: "failed" });

          bcrypt.compare(body.password, rows[0].password, (_, result) => {
            if (result) return res.status(200).json({ id: rows[0].id });
            res.status(401).json({ message: "failed" });
          });
        },
      );
    } catch (e) {
      console.error(e);
    }
  });

  return router;
};
