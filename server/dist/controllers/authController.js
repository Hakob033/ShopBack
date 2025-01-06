"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { name } });
        if (existingUser) {
            res.status(409).json({ message: "Username already exists." });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, password: hashedPassword },
        });
        res
            .status(201)
            .json({ message: "User registered successfully.", userId: user.id });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).json({ message: "Username and password are required." });
        return;
    }
    try {
        const user = await prisma.user.findUnique({
            where: { name },
        });
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid username or password." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
        });
        res.send({ token, user });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
exports.loginUser = loginUser;
