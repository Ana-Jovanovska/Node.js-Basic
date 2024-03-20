import { TaskModel } from "../models/tasks.model.js";

export class TaskController {
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAllTasks(req.query);

      return res.json(tasks);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
}
