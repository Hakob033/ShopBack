import express from "express";
import { addProduct, deleteProduct } from "../controllers/productController"; // Import the controller

const router = express.Router();

// Define the route
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);

export default router;
