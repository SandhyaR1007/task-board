const express = require("express");
const Task = require("../models/taskModel");
const taskRouter = express.Router();

taskRouter.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      id: req.body.id,
      summary: "new task",
      assignee: "JOhnn",
      date: new Date(),
    });
    if (task) {
      res.status(201).json({ messgae: "task created successfully" });
    } else {
      res.status(401).json({ message: "some error occurred" });
    }
  } catch (err) {
    res.status(500).json({ message: "some error occurred", err });
  }
});
taskRouter.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

module.exports = taskRouter;
