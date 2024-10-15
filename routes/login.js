module.exports = (connection, bcrypt) => {
  const express = require("express");
  const router = express.Router();

  router.post("/", (req, res) => {
    const body = req.body;

    // login logic
  });

  return router;
};
