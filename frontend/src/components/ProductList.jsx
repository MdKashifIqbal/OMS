import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  if (!products.length) return <p>No products available.</p>;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="mt-2 text-green-600 font-bold">₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
