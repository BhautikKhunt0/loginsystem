const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./config.js");
const router = require("./router.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

connection();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => console.log(`Server running on   ${PORT}`));
