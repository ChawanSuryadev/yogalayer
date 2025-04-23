import React from "react";

// Card component to display product details
const Card = ({ product, addToCart, discount }) => {
  return (
    <div className="border rounded-lg shadow p-9">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-52 object-contain mb-2"
      />

      {/* Product Name */}
      <h2 className="text-lg font-medium mb-1">{product.name}</h2>

      {/* Product Price and Discount */}
      <div className="flex justify-between text-sm items-center mb-3">
        <span className="line-through text-gray-500">₹{product.mrp}</span>
        <span className="text-black font-bold text-lg">₹{product.price}</span>
        <span className="text-green-600 text-sm">{discount}% off</span>
      </div>

      {/* Button Section */}
      <div className="flex justify-center space-x-4 mt-40">
        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-32 bg-white text-black border border-black px-6 py-0.5 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          Add to Cart
        </button>

        {/* Buy Now Button */}
        <button
          onClick={() => alert('Proceeding to Buy Now!')}
          className="w-32 bg-blue-600 text-white px-6 py-0.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Card;
