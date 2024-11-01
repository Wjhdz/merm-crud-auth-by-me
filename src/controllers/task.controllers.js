import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const Tasks = await Task.find({ user: req.user.id });
  res.status(200).json(Tasks);
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description });
    const saveTask = await newTask.save();
    return res.status(200).json(saveTask);
  } catch (error) {
    return res.status(400).json({ message: "Error creating task" });
  }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: "error geting task" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: "Error deleting task" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: "Error updating task" });
  }
};
