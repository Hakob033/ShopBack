import { Request, Response } from "express";
import prisma from "../prismaClient";

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, pageSize = 6, category, name } = req.query;

    const pageNum = parseInt(page as string, 10);
    const pageSizeNum = parseInt(pageSize as string, 10);

    if (pageNum < 1 || pageSizeNum < 1) {
      res
        .status(400)
        .json({ error: "Page and pageSize must be greater than 0" });
      return;
    }

    const whereFilter: any = {};

    if (category) {
      whereFilter.category = category;
    }

    if (name) {
      whereFilter.name = {
        contains: name as string,
        mode: "insensitive",
      };
    }

    const products = await prisma.product.findMany({
      where: whereFilter,
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum,
    });

    const totalProducts = await prisma.product.count({
      where: whereFilter,
    });

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

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

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
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !sku || !price || stockQuantity === undefined) {
      res.status(400).json({
        error: "Name, SKU, price, stockQuantity, and imageUrl are required",
      });
      return;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        sku,
        category,
        description,
        price,
        stockQuantity,
        imageUrl,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { deleteProduct, addProduct, getProducts, getProductById };
