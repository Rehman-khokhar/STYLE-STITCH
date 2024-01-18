import slugify from "slugify";
import ProductModle from "../Models/ProductModle.js";
import fs from "fs";

// create product
export const createProductController = async (req, res) => {
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
    const products = new ProductModle({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
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
    const products = await ProductModle.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(201).send({
      success: true,
      message: "Single product fetched",
      products,
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
