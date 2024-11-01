import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.post("/task", authRequired, createTask);
router.get("/tasks", authRequired, getTasks);
router.get("/task/:id", authRequired, getTask);
router.put("/updateTask/:id", authRequired, updateTask);
router.put("/deleteTask/:id", authRequired, deleteTask);

export default router;
