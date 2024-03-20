import { Router } from "express";
import { TaskController } from "../controllers/tasks.controler.js";

export const taskRouter = Router();

taskRouter.get("/", TaskController.getAllTasks);
taskRouter.get("/:id", TaskController.getTaskById);
taskRouter.post("/", TaskController.createTask);
taskRouter.post("/:id", TaskController.updateTask);
taskRouter.delete("/:id", TaskController.deleteTask);
taskRouter.delete("/", TaskController.deleteAllTasks);
