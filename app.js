const express = require("express");
const app = express();
const port = 3000;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
