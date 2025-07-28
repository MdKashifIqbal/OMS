const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} = require("../controllers/product.controller");

const productRouter = express.Router();

// route   POST /products
productRouter.post("/products", createProduct);

// route   GET /products
productRouter.get("/products", getAllProducts);

// route   GET /products/:id
productRouter.get("/products/:id", getProductById);

// route   DELETE /products/:id
productRouter.delete("/products/:id", deleteProduct);

module.exports = productRouter;
