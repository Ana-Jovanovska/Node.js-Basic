import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export const tasksRouter = Router();

tasksRouter.get("/", TaskController.getAllTasks);
