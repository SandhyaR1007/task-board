const express = require("express");
const taskRouter = require("./routes/taskRouter");
const dbConnect = require("./models/connection");

const app = express();
app.use(express.json());
app.use("/task", taskRouter);

app.listen(8000);
dbConnect();
console.log("listening to port 8000");
