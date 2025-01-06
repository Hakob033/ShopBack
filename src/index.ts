import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { addProduct } from "./routes/productRouts";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/addProduct", addProduct);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
