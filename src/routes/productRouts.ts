import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productController"; // Import the controller

const router = express.Router();

// Define the route
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts);

export default router;
