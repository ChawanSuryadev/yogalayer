import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/orders/${user._id}`);
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            {/* Razorpay single-product order */}
            {order.product ? (
              <>
                <p className="text-sm text-gray-500">
                  Order Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-base font-medium">{order.product.name}</p>
                <p className="text-sm">₹{order.product.price}</p>
              </>
            ) : (
              // Traditional cart-based order
              <>
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
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrdersPage;
