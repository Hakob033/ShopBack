import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
// import inventoryRoutes from "./routes/inventoryRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
// app.use("/inventory", inventoryRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Inventory API");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
