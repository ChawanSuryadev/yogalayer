// frontend/src/pages/CartPage.jsx
import React from "react";
import PaymentButton from "../components/PaymentButton";

export default function CartPage({ cart, user, setCart }) {
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice}</h3>

          {/* Pass totalPrice, user and cart info to PaymentButton */}
          <PaymentButton amount={totalPrice} user={user} cart={cart} setCart={setCart} />
        </>
      )}
    </div>
  );
}
