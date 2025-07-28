import React, { useState, useEffect } from "react";

const OrderForm = ({ onOrderPlaced }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      return alert("User not logged in.");
    }

    const order = {
      items: [
        {
          product: selectedProduct,
          quantity: Number(quantity),
        },
      ],
      userId: user._id,
      paymentCollected: false, // default, can change later
    };

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      setQuantity(1);
      setSelectedProduct("");
      onOrderPlaced?.();
      alert("Order placed!");
    } else {
      const errData = await res.json();
      alert("Failed to place order: " + errData.msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-xl mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Place an Order</h2>

      <label className="block mb-2">
        Product:
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="mt-1 p-2 w-full border rounded"
          required
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min={1}
          className="mt-1 p-2 w-full border rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
