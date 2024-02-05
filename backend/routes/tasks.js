const express = require("express")
const Task = require("../models/Task")
const router = express.Router();

router.get("/", async(req,res) => {
    try {
        const tasks = await Task.find({userId: req.query.userId});
        res.json({success: true, data: tasks});
    } catch (err) {
        res.status(404).json({success: false, data: err.message});
    }
});

router.post("/", async(req,res) => {
    try {
        await Task.create(req.body);
        return res.status(200).json({success: true, msg: "Task created successfully!"});
    } catch (err) {
        return res.status(400).json({success: false, msg: err});
    }
});

router.delete("/", async (req, res) => {
    const taskId = req.query.taskId;
  
    try {
      // Check if the task with the given ID exists
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Edit the task
router.put("/", async (req, res) => {
    const taskId = req.query.taskId;
    const updates = req.body;
    // console.log(updates);
  
    try {
      // Check if the task with the given ID exists
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Update the task fields
      Object.keys(updates).forEach((field) => {
        task[field] = updates[field];
      });
  
      // Save the updated task
      await task.save();
      res.json({ message: "Task updated successfully", updatedTask: task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;