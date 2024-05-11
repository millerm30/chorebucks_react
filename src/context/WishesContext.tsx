import { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import success from "../sounds/success.mp3";
import negative from "../sounds/icqdelete.mp3";
import yay from "../sounds/yay.mp3";
import { Wish } from "../types";
import ShoppingContext from "./ShoppingContext"; // Import the correct ShoppingContext

interface WishesContextType {
  wishes: Wish[];
  addWish: (title: string, points: number) => void;
  completeWish: (wish: Wish) => void;
  removeWish: (wish: Wish) => void;
  createRandomBackGroundColors: () => string;
}

const WishesContext = createContext<WishesContextType>({
  wishes: [],
  addWish: () => {},
  completeWish: () => {},
  removeWish: () => {},
  createRandomBackGroundColors: () => "",
});

const localStorageKey = "wishList";

function getInitialWishes() {
  return localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey) as string)
    : [];
}

const createRandomBackGroundColors = () => {
  const x: number = Math.floor(Math.random() * 256);
  const y: number = Math.floor(Math.random() * 256);
  const z: number = Math.floor(Math.random() * 256);
  const bgColor: string = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
};

const audioAddWish = new Audio(success);
const audioFailure = new Audio(negative);
const audioSuccess = new Audio(yay);

export function WishesProvider({ children }) {
  const { addToCartHandler } = useContext(ShoppingContext);
  const [wishes, setWishes] = useState(getInitialWishes);

  const addWish = (title: string, points: number) => {
    audioAddWish.play();
    toast(`😃 ${title} added to wish list!`);
    setWishes([
      ...wishes,
      {
        title,
        points,
        id: uuid(),
        style: { borderColor: createRandomBackGroundColors() },
      },
    ]);
  };

  const completeWish = (wish: Wish) => {
    audioSuccess.play();
    addToCartHandler(wish.title, wish.points);
    setWishes(wishes.filter((i: Wish) => i.id !== wish.id));
    toast(`🚀 ${wish.title} added to shopping cart! 🚀`);
  };

  const removeWish = (wish: Wish) => {
    audioFailure.play();
    toast(`😛 ${wish.title} removed from wish list!`);
    setWishes(wishes.filter((i: Wish) => i !== wish));
  };

  useEffect(() => {
    const store = JSON.stringify(wishes);
    localStorage.setItem("wishList", store);
  }, [wishes]);

  return (
    <WishesContext.Provider
      value={{
        wishes,
        addWish,
        completeWish,
        removeWish,
        createRandomBackGroundColors,
      }}
    >
      {children}
    </WishesContext.Provider>
  );
}

export default WishesContext;