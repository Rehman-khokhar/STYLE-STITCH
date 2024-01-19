import express from "express";
import { requireSignIn, isAdmin } from "../Middlewares/authToken.js";
import {
  createProductController,
  ProductController,
  SingleProductController,
  ProductPhotoController,
  ProductDelete,
  updateController,
} from "../Controller/ProductsController.js";
import ExpressFormidable from "express-formidable";
import { imageUpload } from "../utils/upload.js";
const router = express.Router();
//  ROUTERS
// Create products
// router.route("/create").post(logoUpload, controller.create);

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  // ExpressFormidable(),
  imageUpload, // Add the imageUpload middleware here
  createProductController
);
// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateController
);
// get all products
router.get("/get-product", ProductController);
// get Single product
router.get("/get-product/:slug", SingleProductController);
// get photo
router.get("/product-photo/:pid", ProductPhotoController);
// delete products
router.delete("/delete-product/:pid", ProductDelete);

export default router;
