"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Router } from "express";
const Router = require("express");
const authController_1 = require("../controllers/authController");
const router = Router();
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.loginUser);
exports.default = router;
