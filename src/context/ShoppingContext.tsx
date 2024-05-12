import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import remove from "../sounds/remove.mp3";
import purchse from "../sounds/purchase.mp3";
import nomoney from "../sounds/nomoney.mp3";
import { ShoppingContextType, CartItem } from "../types";

const ShoppingContext = createContext<ShoppingContextType>({
  cart: [],
  addToCartHandler: () => {},
  removeFromCartHandler: () => {},
  purchaseCartHandler: () => {},
  cartTotal: 0,
  updateCartItem: () => {},
});

function getInitalCart() {
  return localStorage.getItem("cartList")
    ? JSON.parse(localStorage.getItem("cartList") as string)
    : [];
}

const audioRemove = new Audio(remove);
const audioPurchase = new Audio(purchse);
const audioNomoney = new Audio(nomoney);

export const ShoppingProvider = ({ points, removePoints, children }) => {
  const [cart , setCart] = useState<CartItem[]>(getInitalCart);
  const [cartTotal, setcartTotal] = useState<number>(0);
  
  const addToCartHandler = (itemTitle: string, itemPoints: number) => {
      setCart([...cart, { title: itemTitle, points: itemPoints, quantity: 1, id: uuid() }]);
  };

  const updateCartItem = (wish: CartItem) => {
      setCart(cart.map((w: CartItem) => {
          if (w.id === wish.id) {
              return wish
          }
          return w
      }))
  };

  const removeFromCartHandler = (wish: CartItem) => {
      audioRemove.play();
      toast(`😭 ${wish.title} removed from shopping cart!`);
      setCart(cart.filter((i: CartItem) => i !== wish));
  };

  const purchaseCartHandler = () => {
      if (points >= cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0)) {
      cart.forEach(() => removePoints(cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0)));
      setCart([]);
      audioPurchase.play();
      toast("🎉 Purchase successful. Great job! 🎉");
      } else {
      audioNomoney.play();
      toast("👎 Not enough points to purchase! Keep working on your chores! 😉");
      }
  };

  useEffect(() => {
      localStorage.setItem("cartList", JSON.stringify(cart));
      setcartTotal(cart.reduce((acc, curr) => acc + curr.points * curr.quantity, 0));
  }, [cart, cartTotal]);

  return (
    <ShoppingContext.Provider value={{ cart, addToCartHandler, removeFromCartHandler, purchaseCartHandler, cartTotal, updateCartItem }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;