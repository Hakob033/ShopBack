"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds); // Hash the password
};
app.post("/register", async (req, res) => {
    try {
        const { name, password } = req.body;
        const newPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                name: name,
                password: newPassword,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res
            .status(500)
            .json({ error: "An error occurred while creating the user." });
    }
});
app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});
app.put("/", (req, res) => { });
app.delete("/", (req, res) => { });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
