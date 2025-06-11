const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      const category = await Category.findOne({ slug: req.query.category });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      filter.categoryId = category._id;
    }

    if (req.query.minPrice) {
      filter.price = { $gte: Number(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filter.price = filter.price || {};
      filter.price.$lte = Number(req.query.maxPrice);
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        message: "productId is not valid!",
      });
    }

    const product = await Product.findOne({
      _id: productId,
    }).populate({ path: "categoryId", select: "title , slug" });

    return res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};

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

exports.update = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { title, description, price, discount, categoryId } = req.body;

    const existsCategory = await Category.findOne({ _id: categoryId });

    if (!existsCategory) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "image not send",
      });
    }

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    const mediaUrlPath = `/images/${req.file.filename}`;

    const discountedPrice = price - (price * discount) / 100;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = discountedPrice || product.price;
    product.discount = discount || product.discount;
    product.categoryId = categoryId || product.categoryId;
    product.image = mediaUrlPath || product.image;

    const editProduct = await product.save();

    return res.status(200).json({
      message: "product updated succesfully",
      product: editProduct,
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {};
