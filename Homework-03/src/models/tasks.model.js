import { DataService } from "../services/data.service.js";
import { createPath } from "../../utils.js";
import { v4 as uuid } from "uuid";
import Joi from "joi";

const TASKS_PATH = createPath(["data", "tasks.json"]);

class Task {
  id = uuid();
  isFinished = false;
  constructor(text, author) {
    this.text = text;
    this.author = author;
  }
}

const taskSchema = Joi.object({
  text: Joi.string().min(2).required(),
  author: Joi.string().min(2).required(),
});

export class TaskModel {
  static async saveTasks(tasks) {
    await DataService.saveJSONFile(TASKS_PATH, tasks);
  }
  static async getAllTasks(filters) {
    let tasks = await DataService.readJSONFile(TASKS_PATH);

    if (filters?.author) {
      tasks = tasks.filter((task) => task.author === filters.author);
    }

    if (filters?.isFinished) {
      tasks = tasks.filter((task) => {
        if (filters.isFinished === "true") return task.isFinished;
        if (filters.isFinished === "false") return !task.isFinished;
      });
    }

    return tasks;
  }
}
