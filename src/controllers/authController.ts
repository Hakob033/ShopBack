import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User registered successfully.", userId: user.id });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", {
      expiresIn: "1h",
    });

    res.send({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
