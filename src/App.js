import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginModal from "./components/LoginModal";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AddressPage from "./pages/AddressPage";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setCart(parsed.cart || []);
      setWishlist(parsed.wishlist || []);
    }
  }, []);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify({ ...user, cart, wishlist }));
    } else {
      localStorage.removeItem("user");
    }
  }, [user, cart, wishlist]);

  // Sync cart/wishlist to backend
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/user/cart/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
    }
  }, [cart]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/user/wishlist/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist }),
      });
    }
  }, [wishlist]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const calculateDiscount = (mrp, price) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Header
          onLoginClick={() => setShowLogin(true)}
          user={user}
          onLogout={() => {
            setUser(null);
            setCart([]);
            setWishlist([]);
          }}
        />

        {showLogin && (
          <div className="modal-overlay">
            <div className="modal-content">
              <LoginModal onClose={() => setShowLogin(false)} setUser={setUser} setCart={setCart} setWishlist={setWishlist} />
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={[
                  {
                    id: 1,
                    name: "Redmi Note 13",
                    price: 22677,
                    mrp: 30999,
                    image: "https://m.media-amazon.com/images/I/71YlH-4MUQL._AC_UY218_.jpg",
                  },
                  {
                    id: 2,
                    name: "Realme Narzo 60",
                    price: 26999,
                    mrp: 26999,
                    image: "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_UY218_.jpg",
                  },
                  {
                    id: 3,
                    name: "iPhone 15 Pro",
                    price: 64400,
                    mrp: 69900,
                    image: "https://m.media-amazon.com/images/I/81CgtwSII3L._AC_UY218_.jpg",
                  },
                ]}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                calculateDiscount={calculateDiscount}
              />
            }
          />
          <Route path="/profile" element={<ProfilePage user={user} />} />
          <Route path="/create-account" element={<CreateAccountPage setUser={setUser} setCart={setCart} setWishlist={setWishlist} />} />
          <Route path="/orders" element={<OrderHistoryPage user={user} />} />
          <Route path="/address" element={<AddressPage user={user} setUser={setUser} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} user={user} setCart={setCart} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
