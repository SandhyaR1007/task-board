const { mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: String,
  summary: String,
  assignee: String,
  date: Date,
  priority: String,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
