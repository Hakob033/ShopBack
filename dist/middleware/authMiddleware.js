"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "aefgrhbdacsg"; // Same secret as used in the controller
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.User = decoded;
        next();
    });
};
exports.authenticateToken = authenticateToken;
