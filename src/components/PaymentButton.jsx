import React from "react";
import axios from "axios";

export default function PaymentButton({ amount = 500, user, setCart }) {
  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login to continue"); // ✅ unified toast style
      return;
    }

    try {
      // Create Razorpay order on backend
      const { data: order } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/payment/create-order`,
        { amount }
        );

        
        const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay Key ID from env
        amount: order.amount,
        currency: order.currency,
        name: "Yogalayer Store",
        description: "Purchase",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verification = await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/payment/verify`,
              response
            );

            if (verification.data.status === "success") {
              alert("Payment verified successfully!");
              // Clear cart after successful payment
              if (setCart) setCart([]);
              // You can also navigate or update UI here
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed due to a server error.");
          }
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.mobile || "", // optional
        },
        notes: {
          address: user.address?.street || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
}
