import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaStore, FaShoppingCart, FaInfoCircle, FaHeart } from "react-icons/fa";
import LoginTooltip from "./LoginTooltip";
import logo from "../assets/logo.png";

export default function Header({ onLoginClick, user, onLogout }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow py-4 px-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Yogalayer Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="flex items-center space-x-5">
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button
              onClick={() => {
                if (user) navigate("/profile");
                else navigate("/create-account");
              }}
              className="flex items-center space-x-2 hover:text-blue-600 text-sm font-medium"
            >
              <FaUser className="text-lg" />
              <span>
                {user ? `Hi, ${user.fullName.split(" ")[0]}` : "Account"}
              </span>
            </button>
            {!user && showTooltip && (
              <LoginTooltip
                visible={showTooltip}
                onClick={onLoginClick}
                dismiss={() => setShowTooltip(false)}
              />
            )}
            {user && (
              <button
                onClick={onLogout}
                className="absolute right-0 top-8 bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>

          <Link to="/cart" className="flex items-center space-x-2 text-sm hover:text-blue-600">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>

          <Link to="/wishlist" className="flex items-center space-x-2 text-sm hover:text-blue-600">
            <FaHeart />
            <span>Wishlist</span>
          </Link>

          <Link to="/seller" className="flex items-center space-x-2 text-sm hover:text-blue-600">
            <FaStore />
            <span>Become a Seller</span>
          </Link>

          <Link to="/about" className="flex items-center space-x-2 text-sm hover:text-blue-600">
            <FaInfoCircle />
            <span>About</span>
          </Link>

          <Link to="/orders" className="text-blue-600 hover:underline">My Orders</Link>

        </div>
      </div>
    </header>
  );
}
