const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "paynance",
});

app.use(bodyParser.json());
app.use("/login", loginRoute(connection, bcrypt));
app.use("/register", registerRoute(connection, bcrypt));

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
