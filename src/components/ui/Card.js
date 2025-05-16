// Card.jsx
import React from "react";
import axios from "axios";

const Card = ({ product, addToCart, discount }) => {
  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login to continue");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/payment/create-order`,
        { amount: product.price }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "Yogalayer",
        description: product.name,
        image: "/logo.png",
        order_id: data.orderId,
        handler: async (response) => {
          await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/add-order`,
            {
              userId: user._id,
              product,
              paymentInfo: response,
            }
          );
          alert("Payment Successful!");
        },
        prefill: {
          name: user.fullName || user.name,
          email: user.email,
          contact: user.mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Buy now error:", err);
      alert("Something went wrong during payment.");
    }
  };

  return (
    <div className="border rounded-lg shadow p-9">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-contain mb-2"
      />
      <h2 className="text-lg font-medium mb-1">{product.name}</h2>
      <div className="flex justify-between text-sm items-center mb-3">
        <span className="line-through text-gray-500">₹{product.mrp}</span>
        <span className="text-black font-bold text-lg">₹{product.price}</span>
        <span className="text-green-600 text-sm">{discount}% off</span>
      </div>
      <div className="flex justify-center space-x-4 mt-40">
        <button
          onClick={() => addToCart(product)}
          className="w-32 bg-white text-black border border-black px-6 py-0.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="w-32 bg-blue-600 text-white px-6 py-0.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
