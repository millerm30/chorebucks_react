import { useContext } from "react";
import AddWishForm from "../components/AddWishForm";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../components/Card";
import { motion } from "framer-motion";
import WishesContext from "../context/WishesContext";

const style = {
  main: `bg-blue-300`,
  section: `grid grid-cols-2 gap-5 py-5 mx-5 md:grid-cols-3 lg:grid-cols-4`,
  paragraph: `text-center italic pt-4`,
  button: `bg-blue-900 my-4 px-4 py-2 text-white font-bold rounded-lg`,
};

const Wishlist = () => {
  const { wishes, addWish, removeWish, completeWish } = useContext(WishesContext);
  return (
    <main className={style.main}>
      <AddWishForm addWish={addWish} />
      {wishes.length === 0 && (
        <p className={style.paragraph}>No Wish List Items!</p>
      )}
      {
        <section className={style.section}>
          {wishes.map((wish) => (
            <Card
              key={wish.id}
              title={wish.title}
              points={wish.points}
              style={wish.style}
              remove={<FaTrashAlt onClick={() => removeWish(wish)} />}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => completeWish(wish)}
                className={style.button}
              >
                Add To Cart
              </motion.button>
            </Card>
          ))}
        </section>
      }
    </main>
  );
};

export { Wishlist };
