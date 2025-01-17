"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRouts_1 = __importDefault(require("./routes/productRouts"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Set up the PORT variable before routes
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Set up the image upload directory and filename
const storage = multer_1.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path_1.default.join(__dirname, "..", "public", "protected_files")); // Set the "protected_files" directory
  },
  filename: (req, file, cb) => {
    const fileExtension = path_1.default.extname(file.originalname);
    cb(null, `${Date.now()}${fileExtension}`); // Add a timestamp to ensure unique filenames
  },
});
// Initialize multer with storage options
const upload = (0, multer_1.default)({ storage });
// Serve static files from the "public/protected_files" folder
app.use(
  "",
  express_1.default.static(
    path_1.default.join(__dirname, "..", "public", "protected_files")
  )
);
// POST endpoint to handle image upload
app.post("/uploads", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  // Send the image URL back to the client
  const imageUrl = req.file.filename;
  res.json({ imageUrl }); // Just call res.json, don't return the Response object
});
app.use("/auth", authRoutes_1.default);
app.use("/api", productRouts_1.default);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
