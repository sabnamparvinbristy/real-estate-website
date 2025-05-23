import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);  // Register new user
router.post("/login", login);        // Log in with credentials
router.post("/logout", logout);      // Logout and clear the token

export default router;
