import { createContext, useState, useEffect } from 'react';
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import success from "../sounds/success.mp3";
import tada from "../sounds/tada.mp3";
import failure from "../sounds/failure.mp3";
import { Chore, ChoresContextType } from '../types';

const ChoresContext = createContext<ChoresContextType>({
  chores: [],
  addChore: () => {},
  removeChore: () => {},
  completeChore: () => {},
});

const getInitialChores = () => {
  const temp = localStorage.getItem('chores');
  const savedChores = JSON.parse(temp || "[]");
  return savedChores || [];
};

const createRandomBackGroundColors = () => {
  const x: number = Math.floor(Math.random() * 256);
  const y: number = Math.floor(Math.random() * 256);
  const z: number = Math.floor(Math.random() * 256);
  const bgColor: string = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
};

const audioAddChore = new Audio(success);
const audioSuccess = new Audio(tada);
const audioFailure = new Audio(failure);

export const ChoresProvider = ({ children, addPoints }) => {
  const [chores, setChores] = useState(getInitialChores());

  useEffect(() => {
    const temp = JSON.stringify(chores);
    localStorage.setItem("chores", temp);
  }, [chores]);

  const addChore = (title: string, points: number) => {
    audioAddChore.play();
    toast(`👍 ${title} added to chores list!`);
    setChores([
      ...chores,
      {
        id: uuid(),
        title,
        points,
        style: { borderColor: createRandomBackGroundColors() },
      },
    ]);
  };

  const removeChore = (chore: Chore) => {
    audioFailure.play();
    toast(`🍩 ${chore.title} removed from chores list!`);
    setChores(chores.filter((c: Chore) => c !== chore));
  };

  const completeChore = (chore: Chore) => {
    audioSuccess.play();
    toast(`👏 ${chore.title} Completed. Good Job! 💸`);
    addPoints(chore.points);
    setChores(chores.filter((c: Chore) => c !== chore));
  };

  return (
    <ChoresContext.Provider
      value={{ chores, addChore, removeChore, completeChore }}
    >
      {children}
    </ChoresContext.Provider>
  );
};

export default ChoresContext;