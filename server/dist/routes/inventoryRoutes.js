"use strict";
// import express from "express";
// import { authenticateToken } from "../middleware/authMiddleware";
// import prisma from "../prismaClient";
// const router = express.Router();
// // Example route for adding a product
// router.post("/add", authenticateToken, async (req, res) => {
//   const { name, price } = req.body;
//   const newProduct = await prisma.product.create({
//     data: {
//       name,
//       price,
//       userId: req.user?.userId, // Link to the user who created the product
//     },
//   });
//   res.status(201).json(newProduct);
// });
// // Add more CRUD routes for editing, deleting products, etc.
// export default router;
