import express from "express";
import {
  getAllTrainers,
  createTrainer,
  getTrainerById,
  updateInfo,
  delateTrainer,
  delateAllTrainers,
} from "./src/trainers.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

//1.Get all trainers:

app.get("/trainers", async (req, res) => {
  try {
    const trainers = await getAllTrainers();
    return res.json(trainers);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

//2.Create trainer:

app.post("/trainers", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished,
    } = req.body;

    if (!firstName || !lastName || !email || !timeEmployed || !coursesFinished)
      throw new Error("Invalid input!");

    const newTrainer = await createTrainer(
      firstName,
      lastName,
      email,
      isCurrentlyTeaching,
      timeEmployed,
      coursesFinished
    );
    return res.status(201).json(newTrainer);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

//3.Get trainers by id:

app.get("/trainers/:id", async (req, res) => {
  try {
    const trainerId = req.params.id;

    const foundTrainer = await getTrainerById(trainerId);

    return res.json(foundTrainer);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
});

//4.Update trainer:

app.listen(PORT, HOST, () => {
  console.log("Server is up on port...");
});
