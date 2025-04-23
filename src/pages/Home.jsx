import React from "react";
import Card from "../components/ui/Card"; // Ensure this path is correct

export default function Home({ products, addToCart, calculateDiscount }) {
  return (
    <div className="container mx-auto p-4">
      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <Card
            key={product.id}
            product={product}
            addToCart={addToCart}
            discount={calculateDiscount(product.mrp, product.price)}
          />
        ))}
      </div>
    </div>
  );
}
