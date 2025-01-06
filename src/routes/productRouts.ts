import { Request, Response } from "express";
import prisma from "../prismaClient";

// Function to handle the POST /products route
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

export { addProduct };
