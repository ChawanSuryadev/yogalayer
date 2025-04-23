import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddressPage({ user, setUser }) {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (!user) navigate("/");
    else if (user.address) setAddress(user.address);
  }, [user, navigate]);

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/address/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Address saved!");
        setUser(data); // update locally
        localStorage.setItem("user", JSON.stringify(data)); // update localStorage
        navigate("/profile");
      } else {
        alert("Failed to save address.");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>

      {["street", "city", "state", "zip", "country"].map((field) => (
        <input
          key={field}
          type="text"
          value={address[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          className="block w-full border px-4 py-2 mb-3 rounded"
        />
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Address
      </button>
      <Link to="/address" className="text-blue-600 hover:underline">
  Edit Address
</Link>

    </div>
  );
}
