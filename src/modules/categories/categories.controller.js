const { isValidObjectId } = require("mongoose");
const Category = require("../../models/Category");
const { createPaginationData } = require("../../utils/pagination");

exports.getAll = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    const users = await Category.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCategories = await Category.countDocuments();

    return res.status(200).json({
      users,
      pagination: createPaginationData(page, limit, totalCategories, "Categories"),
    });
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({
        message: "categoryId is not valid!",
      });
    }

    const category = await Category.findOne({
      _id : categoryId,
    });

    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.add = async (req, res, next) => {
  try {
    const { title, slug } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Cover not send!",
      });
    }
  
    const existingCategory = await Category.findOne({ slug });
  
    if (existingCategory) {
      return res.status(400).json({
        message: "This slug is already exists",
      });
    }
  
    const mediaUrlPath = `/images/${req.file.filename}`;
  
    const category = await Category.create({
      title,
      slug,
      image: mediaUrlPath,
    });
  
    return res.status(201).json({
      message : "Category created successfully",
      category
    })
  } catch (error) {
    next(error)
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const removedCategory = await Category.findOneAndDelete({
      _id: categoryId,
    });

    if (!removedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(404).json({
      message: "Category removed successfully",
      category: categoryId,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {categoryId} = req.params;
    const { title, slug  } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message : "image not send"
      })
    }

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const mediaUrlPath = `/images/${req.file.filename}`;

    category.title = title || category.title;
    category.image = mediaUrlPath || category.image;
    category.slug = slug || category.slug;

    const editCategory = await category.save();

    return res.status(200).json({
      message: "Category updated succesfully",
      category: editCategory,
    });
  } catch (error) {
    next(error);
  }
};
