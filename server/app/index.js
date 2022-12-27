const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const { errorHandler } = require("./lib/utils");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

require('./models')

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

module.exports = {
  app
}