const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Product", schema);

module.exports = model;