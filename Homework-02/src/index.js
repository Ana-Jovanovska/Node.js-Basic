import { DataService } from "./data.service.js";
import { createPath } from "../path.js";
import { Trainer } from "./trainer.model.js";

const TRAINERS_PATH = createPath(["data", "tainers.json"]);

//Save all trainers:
const saveTrainers = async (trainers) => {
  await DataService.saveJSONFile(TRAINERS_PATH, trainers);
};

//1.Get all trainers:

export const getAllTrainers = async () => {
  const trainers = await DataService.readJSONFile(TRAINERS_PATH);

  return trainers;
};

//2.Get trainer by id:

export const getTrainerById = async (trainerId) => {
  const tainers = await getAllTrainers();

  const foundTrainer = tainers.find((tainers) => tainers.id === trainerId);

  if (!foundTrainer) throw new Error("Trainer not found!");
};

//3.Update trainer info:

export const updateInfo = async (trainerId, updateData) => {
  const trainer = await getAllTrainers();

  if (!trainer.some((trainer) => trainer.id === trainerId))
    throw new Error("Can't update trainer! Trainer not found!");

  const updatedInfo = trainer.map((trainer) => {
    if (trainer.id === trainerId) {
      return { ...trainer, ...updateData };
    } else {
      return trainer;
    }
  });

  await saveTrainers(updatedInfo);
};

//4.Add a trainer:

export const createTrainer = async (
  firstName,
  lastName,
  email,
  isCurrentlyTeaching,
  timeEmployed,
  coursesFinished
) => {
  const trainers = await getAllTrainers();

  const newTrainer = new Trainer(
    firstName,
    lastName,
    email,
    isCurrentlyTeaching,
    timeEmployed,
    coursesFinished
  );

  const updatedTrainers = [...trainers, newTrainer];

  await saveTrainers(updatedTrainers);

  return newTrainer;
};

//5.Delete trainer:

export const delateTrainer = async (trainerId) => {
  const tainers = await getAllTrainers();

  const updateTrainers = trainers.filter((trainer) => trainer.id !== trainerId);

  if (!updateTrainers.lenght === trainers.lenght) {
    throw new Error("Can't delete trainer! Trainer not found!");

    await saveTrainers(updateTrainers);
  }
};

//6.Delete all trainer:

export const delateAllTrainers = async () => {
  await saveTrainers([]);
};
