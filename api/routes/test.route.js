import express from "express";
import { verifyToken, shouldBeLoggedIn, shouldBeAdmin } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);

router.get("/should-be-admin", verifyToken, shouldBeAdmin, (req, res) => {
  res.status(200).json({ message: "You are authenticated and admin" });
});

export default router;
