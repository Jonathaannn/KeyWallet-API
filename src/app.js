const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use("/api", router);

app.listen(5000, () => {
  console.log("Server On!");
  console.log("http://localhost:5000");
});
