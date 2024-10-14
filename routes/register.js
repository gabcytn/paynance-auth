const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paynance",
});
connection.connect();

router.post("/", (req, res) => {
  // TODO (login logic)
});
