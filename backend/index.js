const express = require("express");
const cors = require("cors");

const taskRouter = require("./routes/taskRouter");
const dbConnect = require("./models/connection");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/task", taskRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8000);
dbConnect();
console.log("listening to port 8000");
