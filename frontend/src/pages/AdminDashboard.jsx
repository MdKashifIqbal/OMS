import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders(); // Refresh the list
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusOptions = ["PENDING", "PAID", "FULFILLED", "CANCELLED"];

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-4 border rounded-md shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Customer:</strong> {order.userId?.name || "N/A"}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
