const Product = require("../../models/Product");
const Category = require("../../models/Category");

exports.getAll = async (req, res, next) => {};
exports.getOne = async (req, res, next) => {};

exports.create = async (req, res) => {
  try {
    const { title, description, price, discount = 0, categoryId } = req.body;

    const discountedPrice = price - (price * discount) / 100;

    const existsCategory = await Category.findOne({ _id: categoryId });

    if (!existsCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    const mediaUrlPath = `/images/${req.file.filename}`;

    const product = new Product({
      title,
      description,
      price: discountedPrice,
      discount,
      categoryId,
      image: mediaUrlPath,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.update = async (req, res, next) => {};
exports.remove = async (req, res, next) => {};
