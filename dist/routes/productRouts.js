"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController"); // Import the controller
const router = express_1.default.Router();
// Define the route
router.post("/products", productController_1.addProduct);
router.delete("/products/:id", productController_1.deleteProduct);
router.get("/products/:id", productController_1.getProductById);
router.get("/products", productController_1.getProducts);
exports.default = router;
