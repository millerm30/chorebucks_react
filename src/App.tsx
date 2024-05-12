import { Toaster } from "react-hot-toast";
import { ChoresProvider } from "./context/ChoresContext";
import { WishesProvider } from "./context/WishesContext";
import { ShoppingProvider } from "./context/ShoppingContext";

function App({ 
  children,
  points,
  addPoints,
  removePoints
}: { 
  children: React.ReactNode,
  points: number,
  addPoints: (points: number) => void,
  removePoints: (points: number) => void })
{
  return (
    <ShoppingProvider points={points} removePoints={removePoints}>
      <WishesProvider>
        <ChoresProvider addPoints={addPoints}>
          {children}
          <Toaster />
        </ChoresProvider>
      </WishesProvider>
    </ShoppingProvider>
  )
}

export default App
