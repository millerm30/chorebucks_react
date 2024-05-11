import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { ChoresProvider } from "./context/ChoresContext";
import { WishesProvider } from "./context/WishesContext";
import { ShoppingProvider } from "./context/ShoppingContext";

function App({ points, addPoints, removePoints }: { points: number, addPoints: (points: number) => void, removePoints: (points: number) => void }) {
  return (
    <ShoppingProvider points={points} removePoints={removePoints}>
      <WishesProvider>
        <ChoresProvider addPoints={addPoints}>
          <Header points={points} />
          <Navigation />
          <Outlet />
          <Footer />
          <Toaster />
        </ChoresProvider>
      </WishesProvider>
    </ShoppingProvider>
  )
}

export default App
