import slugify from "slugify";
import Product from "../Models/Product.js";
import fs from "fs";
import categoryModel from "../Models/CategoryModel.js";
import braintree from "braintree";
import OrderModle from "../Models/OrderModle.js";
import dotenv from "dotenv";

dotenv.config();

//  pament getway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
// create product
export const createProductController = async (req, res) => {
  try {
    // console.log(req.fields);
    console.log(req.body);
    const payload = req.body;
    // const { name, slug, description, price, category, quantity, shiping } =
    //   req.fields;
    console.log("req.files", req.files);
    console.log("payload", payload);
    const { name, description, price, category, quantity, shiping } = payload;
    console.log("name", name);
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!quantity)
      return res.status(400).send({ error: "quantity is required" });

    for (const key in req.files) {
      const image = req.files[key];
      console.log("image", image);
      payload[`${key}`] = image[0]?.filename;
    }
    console.log("payload", payload);
    // const products = new Product({ payload, slug: slugify(name) })
    const products = new Product(payload);
    console.log("products", products);

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};
// get allProducts
export const ProductController = async (req, res) => {
  try {
    const products = await ProductModle.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};
// Single product
export const SingleProductController = async (req, res) => {
  try {
    const product = await ProductModle.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error to get single product",
      error,
    });
  }
};
// photo controller
export const ProductPhotoController = async (req, res) => {
  try {
    const products = await ProductModle.findById(req.params.pid).select(
      "photo"
    );
    if (products.photo.data) {
      res.set("Content-type", products.photo.contentType);
      return res.status(200).send(products.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while geting photo",
      error,
    });
  }
};
// deleting product
export const ProductDelete = async (req, res) => {
  try {
    await ProductModle.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting photo",
      error,
    });
  }
};
// Update product controller
export const updateController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shiping } =
      req.fields;
    const { photo } = req.files;

    // velidation
    switch (true) {
      case !name:
        return res.status(505).send({ error: "Name is required" });

      case !description:
        return res.status(505).send({ error: "Description is required" });
      case !price:
        return res.status(505).send({ error: "Price is required" });
      case !category:
        return res.status(505).send({ error: "Category is required" });
      case !quantity:
        return res
          .status(505)
          .send({ error: "Number of products is required" });
      case !photo && photo.size > 100000:
        return res
          .status(505)
          .send({ error: "Photo is required and Should be less then 1mb" });
    }
    const products = await ProductModle.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product",
      error,
    });
  }
};

//  product filter
export const productFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;

    const products = await ProductModle.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
//  product count cntroller

export const productCountController = async (req, res) => {
  try {
    const total = await ProductModle.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in product count",
      error,
    });
  }
};
//  Product list controller

export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModle.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error on page cntrol",
      error,
    });
  }
};

// search product controller
export const SearchproductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await ProductModle.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while searching",
      error,
    });
  }
};

//  Related product controller

export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModle.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(5)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};
//  product category wise
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await ProductModle.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while to find category",
      error,
    });
  }
};

// payment method
// token

export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// payments
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransection = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModle({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
