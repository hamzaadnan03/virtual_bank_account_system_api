import express from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const router = express.Router();

// POST route for creating a new user
router.post("/signup", createUser);
// POST route for login user
router.post("/login", loginUser);

export default router;
