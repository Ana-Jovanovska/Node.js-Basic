import { TaskModel } from "../models/tasks.model.js";

export class TaskController {
  //1.Get all tasks:
  static async getAllTasks(req, res) {
    try {
      const tasks = await TaskModel.getAllTasks(req.query);

      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
  //2.Get tasks by id:
  static async getTaskById(req, res) {
    try {
      const { id: taskId } = req.params;

      const foundTask = await TaskModel.getTaskById(taskId);

      return res.json(foundTask);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  //3.Create tasks:
  static async createTask(req, res) {
    try {
      const newTask = await TaskModel.createTask(req.body);

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  //4.Update tasks:
  static async updateTask(req, res) {
    try {
      const updatedTask = await TaskModel.updateTask(req.params.id, req.body);

      return res.json(updatedTask);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }
  //5.Delete tasks:
  static async deleteTask(req, res) {
    try {
      await TaskModel.deleteTask(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  //6.Delete all tasks:
  static async deleteAllTasks(req, res) {
    try {
      await TaskModel.deleteAllTasks();

      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }
}
