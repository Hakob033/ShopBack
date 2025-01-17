"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProductById = exports.getProducts = exports.addProduct = exports.deleteProduct = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prismaClient_1.default.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getProductById = getProductById;
const getProducts = async (req, res) => {
    try {
        const { page = 1, pageSize = 6, search, stockQuantity } = req.query;
        const pageNum = parseInt(page, 10);
        const pageSizeNum = parseInt(pageSize, 10);
        if (pageNum < 1 || pageSizeNum < 1) {
            res
                .status(400)
                .json({ error: "Page and pageSize must be greater than 0" });
            return;
        }
        const whereFilter = {};
        // Handle the search filter (can be name, category, or sku)
        if (search) {
            whereFilter.OR = [
                { name: { contains: search, mode: undefined } },
                { category: { contains: search, mode: undefined } },
                { sku: { contains: search, mode: undefined } },
            ];
        }
        // Handle stockQuantity filter
        if (stockQuantity) {
            // Convert stock status string into numerical range
            if (stockQuantity === "In Stock") {
                whereFilter.stockQuantity = {
                    gt: 10, // Greater than 10
                };
            }
            else if (stockQuantity === "Low Stock") {
                whereFilter.stockQuantity = {
                    gt: 0,
                    lte: 10, // Greater than 0 and less than or equal to 10
                };
            }
            else if (stockQuantity === "Out of Stock") {
                whereFilter.stockQuantity = {
                    lte: 0, // Less than or equal to 0
                };
            }
            else {
                res.status(400).json({ error: "Invalid stockQuantity value provided" });
                return;
            }
        }
        // Fetch products based on the constructed filter
        const products = await prismaClient_1.default.product.findMany({
            where: whereFilter,
            skip: (pageNum - 1) * pageSizeNum,
            take: pageSizeNum,
        });
        // Get the total number of products matching the filter
        const totalProducts = await prismaClient_1.default.product.count({
            where: whereFilter,
        });
        // Return the products and pagination data
        res.status(200).json({
            products,
            totalProducts,
            page: pageNum,
            pageSize: pageSizeNum,
            totalPages: Math.ceil(totalProducts / pageSizeNum),
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getProducts = getProducts;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prismaClient_1.default.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        await prismaClient_1.default.product.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.deleteProduct = deleteProduct;
const addProduct = async (req, res) => {
    try {
        const { name, sku, category, description, price, stockQuantity, imageUrl } = req.body;
        // Update the image URL path to match the correct static serving route
        // const imageUrl = req.file
        //   ? `/public/protected_files/${req.file.filename}`
        //   : "";
        if (!name || !sku || !price || stockQuantity === undefined) {
            res.status(400).json({
                error: "Name, SKU, price, stockQuantity, and imageUrl are required",
            });
            return;
        }
        const newProduct = await prismaClient_1.default.product.create({
            data: {
                name,
                sku,
                category,
                description,
                price,
                stockQuantity,
                imageUrl, // Store the correct image URL
            },
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.addProduct = addProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, sku, category, description, price, stockQuantity, imageUrl } = req.body;
        const product = await prismaClient_1.default.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        const updatedProduct = await prismaClient_1.default.product.update({
            where: { id: parseInt(id) },
            data: {
                name: name || product.name,
                sku: sku || product.sku,
                category: category || product.category,
                description: description || product.description,
                price: price !== undefined ? price : product.price,
                stockQuantity: stockQuantity !== undefined ? stockQuantity : product.stockQuantity,
                imageUrl: imageUrl !== undefined ? imageUrl : product.imageUrl,
            },
        });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.updateProduct = updateProduct;
