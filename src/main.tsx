import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import { Home } from './pages/Home.tsx'
import { Chores } from './pages/Chores.tsx'
import { Wishlist } from './pages/Wishlist.tsx'
import { Cart } from './pages/Cart.tsx'
import { Login } from './pages/Login.tsx'
import ChoresAddModal from './components/ChoreAddModal.tsx'
import { UserProvider } from './context/AuthContext.tsx'
import AuthContext from './context/AuthContext.tsx'

function getBucksFromLocalStorage() {
  const points = localStorage.getItem("points");
  if (points) {
    return Number(points);
  }
  return 0;
}

export const RootComponent = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [points, setPoints] = useState(() => getBucksFromLocalStorage());
  const addPoints = (amount: number) => setPoints((prevPoints) => prevPoints + amount);
  const removePoints = (amount: number) =>
    setPoints((prevPoints) => prevPoints - amount);

  useEffect(() => {
    localStorage.setItem("points", points.toString());
  }, [points]);

  console.log(isLoggedIn);

  return (
    <React.StrictMode>
      <App points={points} addPoints={addPoints} removePoints={removePoints}>
        <BrowserRouter basename="/chorebucks_react">
          <Routes>
            {isLoggedIn ? (
            <Route path="/" element={<Layout points={points} />} >
              <Route index element={<Home />} />
              <Route path="/chores" element={<Chores />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart points={points} />} />
              <Route path="/choresadd" element={<ChoresAddModal />} />
            </Route>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </BrowserRouter>
        </App>
    </React.StrictMode>
  );
}

const Main = () => {
  return (
    <UserProvider>
      <RootComponent />
    </UserProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Main />
);
