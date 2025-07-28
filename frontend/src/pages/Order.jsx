import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("You must be logged in to view orders.");
      return navigate("/signin");
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/orders?userId=${user._id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.filter(order=>order.user._id==user._id)))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [navigate]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-yellow-100 text-yellow-800";
      case "PICKED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const totalPrice = order.items.reduce((total, item) => {
              return total + (item.product?.price || 0) * item.quantity;
            }, 0);

            return (
              <div
                key={order._id}
                className="border p-4 rounded shadow bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">
                    <span className="font-semibold">Order ID:</span>{" "}
                    {order._id}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 mb-3">
                  Ordered at: {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="mt-2">
                  <p className="font-semibold mb-1">Products:</p>
                  <ul className="list-disc list-inside">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.product?.name ?? "Unknown product"} — Qty:{" "}
                          {item.quantity} — ₹
                          {item.product?.price
                            ? item.product.price * item.quantity
                            : "N/A"}
                        </li>
                      ))
                    ) : (
                      <li className="text-red-500">No product data</li>
                    )}
                  </ul>
                </div>

                <p className="mt-3 font-semibold text-right">
                  Total: ₹{totalPrice}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
