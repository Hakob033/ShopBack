import express from "express";
import multer from "multer";
import {
  addProduct,
  deleteProduct,
  getProducts,
  getProductById,
} from "../controllers/productController"; // Import the controller

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define the routes
router.post("/products", upload.single("image"), addProduct); // Use multer for file upload
router.delete("/products/:id", deleteProduct);
router.get("/products/:id", getProductById);
router.get("/products", getProducts);

export default router;
