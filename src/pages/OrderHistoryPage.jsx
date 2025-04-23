import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderHistoryPage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  const orders = user.orders || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <p className="text-sm text-gray-500">
              Order Date: {new Date(order.paidAt).toLocaleDateString()}
            </p>
            <ul className="ml-4 mt-2 list-disc text-sm">
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.name} – ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}
