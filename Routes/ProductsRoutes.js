import express from "express";
import { requireSignIn, isAdmin } from "../Middlewares/authToken.js";
import {
  createProductController,
  ProductController,
  SingleProductController,
  ProductPhotoController,
  ProductDelete,
  updateController,
  productFiltersController,
  productCountController,
  productListController,
  SearchproductController,
  realtedProductController,
  productCategoryController,
  brainTreeTokenController,
  braintreePaymentController,
} from "../Controller/ProductsController.js";
import ExpressFormidable from "express-formidable";

const router = express.Router();
//  ROUTERS
// Create products
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
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
router.get("/get-Single-product/:slug", SingleProductController);
// get photo
router.get("/product-photo/:pid", ProductPhotoController);
// delete products
router.delete("/delete-product/:pid", ProductDelete);

//  filter products
router.post("/product-filter", productFiltersController);

// product count

router.get("/product-count", productCountController);
// Product per page
router.get("/product-list/:page", productListController);
// Search product router
router.get("/search/:keyword", SearchproductController);
//  Simlar product
router.get("related-product/:pid/:cid", realtedProductController);
// category wise product
router.get("/product-category/:slug", productCategoryController);

// paments routes
// token
router.get("/braintree/token", brainTreeTokenController);
// pementes
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
