import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRouts";
import cors from "cors";
import path from "path";
import multer from "multer";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
