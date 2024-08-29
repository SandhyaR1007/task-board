const { mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  summary: String,
  assignee: String,
  date: Date,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
