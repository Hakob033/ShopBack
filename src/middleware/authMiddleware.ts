import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "aefgrhbdacsg";

interface AuthenticatedRequest extends Request {
  User?: {
    userId: number;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return; // Explicitly stop execution
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return; // Explicitly stop execution
    }

    req.User = decoded as { userId: number };
    next(); // Call the next middleware
  });
};
