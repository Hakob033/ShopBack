import express, { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";

const router: Router = express.Router();

// Define the routes
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts); // Public route

export default router;
