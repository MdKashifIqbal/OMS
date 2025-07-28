const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/orders", createOrder);
orderRouter.get("/orders", getAllOrders);
orderRouter.get("/orders/:id", getOrderById);
orderRouter.patch("/orders/:id/status", updateOrderStatus);

module.exports = orderRouter;
