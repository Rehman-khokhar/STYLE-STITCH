import express from "express";
import { requireSignIn, isAdmin } from "./../Middlewares/authToken.js";
import {
  CreateCategoryController,
  UpdateController,
  controllerCategory,
  singleCategoryControlled,
  DeleteCategory,
} from "../Controller/CategoryController.js";

const router = express.Router();
// routes

// Create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);
// update category
router.put("/update-category/:id", requireSignIn, isAdmin, UpdateController);
//  all category
router.get("/get-category", controllerCategory);
// single Category
router.get("/single-category/:slug", singleCategoryControlled);

// Delete Category
router.delete("/Delete-category/:id", requireSignIn, isAdmin, DeleteCategory);

export default router;
