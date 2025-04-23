import React from "react";

export default function CheckoutPage({ cart, user, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to complete checkout.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/user/checkout/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Order placed successfully!");
        setCart([]);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert(data.error || "Checkout failed.");
      }
    } catch (err) {
      alert("Network error during checkout.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">
            Total: ₹{total.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700"
          >
            Pay Now
          </button>
        </>
      )}
    </div>
  );
}
