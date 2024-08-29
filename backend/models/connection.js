const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.log("Error in connecting", err));
};

module.exports = dbConnect;
