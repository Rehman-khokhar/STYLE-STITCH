import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../Controller/authController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authToken.js";
// Router obj
const router = express.Router();

// All Routes || register method || post method
router.post("/register", registerController);
// Login Method || post method
router.post("/login", loginController);

// for text ||
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
