import CategoryModel from "../Models/CategoryModel.js";
import slugify from "slugify";

export const CreateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({
        message: "name is required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category is Already Exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
    });
  }
};

// update categorycontroller
export const UpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Category",
      error,
    });
  }
};
//  all category contoller
export const controllerCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Category list",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all category",
      error,
    });
  }
};

// Single category controlled

export const singleCategoryControlled = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error white getting single Category",
    });
  }
};
// Delete Category
export const DeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While deteting Category",
      error,
    });
  }
};
