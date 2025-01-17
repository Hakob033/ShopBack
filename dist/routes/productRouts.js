"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const router = express_1.default.Router();
// router.post("/products", authenticateToken, addProduct);
// router.delete("/products/:id", authenticateToken, deleteProduct);
// router.put("/products/:id", authenticateToken, updateProduct);
// router.get("/products/:id", authenticateToken, getProductById);
// router.get("/products", authenticateToken, getProducts);
router.post("/products", productController_1.addProduct);
router.delete("/products/:id", productController_1.deleteProduct);
router.put("/products/:id", productController_1.updateProduct);
router.get("/products/:id", productController_1.getProductById);
router.get("/products", productController_1.getProducts);
exports.default = router;
