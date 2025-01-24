import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRouts";
import cors from "cors";
import path from "path";
import multer from "multer";

dotenv.config();

const app = express();

// Set up the PORT variable before routes
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Set up the image upload directory and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "protected_files")); // Set the "protected_files" directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`); // Add a timestamp to ensure unique filenames
  },
});

// Initialize multer with storage options
const upload = multer({ storage });

// Serve static files from the "public/protected_files" folder
app.use(
  "",
  express.static(path.join(__dirname, "..", "public", "protected_files"))
);

// POST endpoint to handle image upload
app.post(
  "/uploads",
  upload.single("image"),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Send the image URL back to the client
    const imageUrl = req.file.filename;
    res.json({ imageUrl }); // Just call res.json, don't return the Response object
  }
);

app.use("/auth", authRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
