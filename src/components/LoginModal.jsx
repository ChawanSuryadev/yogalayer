import React, { useState } from "react";

export default function LoginModal({ onClose, setUser, setCart, setWishlist }) {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrMobile: input,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setCart(data.user.cart || []);
        setWishlist(data.user.wishlist || []);
        onClose();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded shadow p-6 relative">
        <button className="absolute top-2 right-4 text-gray-500 text-xl" onClick={onClose}>✕</button>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Email or Mobile Number"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-gray-300 rounded px-4 py-2 mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}