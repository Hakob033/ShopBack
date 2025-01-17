import express, { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";

const router: Router = express.Router();

// router.post("/products", authenticateToken, addProduct);
// router.delete("/products/:id", authenticateToken, deleteProduct);
// router.put("/products/:id", authenticateToken, updateProduct);
// router.get("/products/:id", authenticateToken, getProductById);
// router.get("/products", authenticateToken, getProducts);
router.post("/products", addProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts);

export default router;
