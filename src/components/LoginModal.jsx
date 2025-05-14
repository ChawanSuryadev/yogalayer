import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose, setUser, setCart, setWishlist }) {
  const [form, setForm] = useState({ emailOrMobile: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      setError("API base URL not set.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setCart(data.user.cart || []);
        setWishlist(data.user.wishlist || []);
        localStorage.setItem("user", JSON.stringify(data.user));
        onClose();
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Email or Mobile"
        value={form.emailOrMobile}
        onChange={(e) => handleChange("emailOrMobile", e.target.value)}
        className="w-full px-4 py-2 border rounded mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        className="w-full px-4 py-2 border rounded mb-3"
      />
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
      >
        Login
      </button>
      <button
        onClick={onClose}
        className="mt-3 w-full text-gray-600 hover:underline text-sm"
      >
        Cancel
      </button>
    </div>
  );
}