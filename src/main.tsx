import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home.tsx'
import { Chores } from './pages/Chores.tsx'
import { Wishlist } from './pages/Wishlist.tsx'
import { Cart } from './pages/Cart.tsx'
import ChoresAddModal from './components/ChoreAddModal.tsx'
import { UserProvider } from './context/AuthContext.tsx'

function getBucksFromLocalStorage() {
  const points = localStorage.getItem("points");
  if (points) {
    return Number(points);
  }
  return 0;
}

export const RootComponent = () => {
  const [points, setPoints] = useState(() => getBucksFromLocalStorage());
  const addPoints = (amount: number) => setPoints((prevPoints) => prevPoints + amount);
  const removePoints = (amount: number) =>
    setPoints((prevPoints) => prevPoints - amount);

  useEffect(() => {
    localStorage.setItem("points", points.toString());
  }, [points]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App
          points={points}
          addPoints={addPoints}
          removePoints={removePoints}
        />
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/chores",
          element: <Chores />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/cart",
          element: <Cart points={points} />,
        },
        {
          path: "/choresadd",
          element: <ChoresAddModal />,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RootComponent />
);
