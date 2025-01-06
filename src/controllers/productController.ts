import { Request, Response } from "express";
import prisma from "../prismaClient";

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
export { deleteProduct, addProduct };
