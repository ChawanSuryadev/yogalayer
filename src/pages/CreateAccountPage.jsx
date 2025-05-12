import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("✅ API Base URL:", apiUrl);

    if (!apiUrl) {
      console.error("❌ VITE_API_BASE_URL is not defined.");
      toast.error("API base URL is missing. Check your .env file.");
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/user/register`, {
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
        toast.success("Account Created Successfully!");
        navigate("/");
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      toast.error("Network error");
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
