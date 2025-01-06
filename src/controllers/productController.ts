import { Request, Response } from "express";
import prisma from "../prismaClient";

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Get the id from URL parameters

    // Fetch the product by id
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }, // Convert the id to an integer if necessary
    });

    // if (!product) {
    //   return res.status(404).json({ error: "Product not found" });
    // }

    // Send the product details in the response
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, pageSize = 6, category, name } = req.query;

    // Convert query parameters to appropriate types
    const pageNum = parseInt(page as string, 10);
    const pageSizeNum = parseInt(pageSize as string, 10);

    // Validate pagination parameters
    if (pageNum < 1 || pageSizeNum < 1) {
      res
        .status(400)
        .json({ error: "Page and pageSize must be greater than 0" });
      return;
    }

    // Build the query filter based on optional query parameters
    const whereFilter: any = {};

    if (category) {
      whereFilter.category = category;
    }

    if (name) {
      whereFilter.name = {
        contains: name as string, // Partial match on name
        mode: "insensitive", // Case-insensitive search
      };
    }

    // Fetch products with filtering and pagination
    const products = await prisma.product.findMany({
      where: whereFilter,
      skip: (pageNum - 1) * pageSizeNum, // Pagination: calculate skip
      take: pageSizeNum, // Limit number of products per page
    });

    const totalProducts = await prisma.product.count({
      where: whereFilter,
    });

    // Send the response with products and pagination info
    res.status(200).json({
      products,
      totalProducts,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(totalProducts / pageSizeNum),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, sku, category, description, price, stockQuantity } = req.body;

    // Ensure required fields are provided
    if (!name || !sku || !price || stockQuantity === undefined) {
      res
        .status(400)
        .json({ error: "Name, SKU, price, and stockQuantity are required" });
      return; // Explicitly return here to stop further execution
    }

    // Create a new product in the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        category,
        description,
        price,
        stockQuantity,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export { deleteProduct, addProduct, getProducts, getProductById };
