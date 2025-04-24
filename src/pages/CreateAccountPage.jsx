import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccountPage({ setUser, setCart, setWishlist }) {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setCart([]);
        setWishlist([]);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      // 👇 Add this part here for better error debugging
      console.error("Error during registration:", err);
      alert("Network error");
    }
  };
  
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Account</h2>
      {["fullName", "mobile", "email", "password"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className="block w-full border px-4 py-2 mb-3 rounded"
          value={form[field]}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ))}
      <button
        onClick={handleCreateAccount}
        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
      >
        Create Account
      </button>
    </div>
  );
}
