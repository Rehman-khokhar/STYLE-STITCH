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

// protected route user || get method
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});
// protected route for admin|| get method
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

// for test ||
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
