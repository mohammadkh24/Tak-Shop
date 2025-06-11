const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentAuthority: { type: String },
  refId: { type: Number },
  status: {
    type: String,
    enum: ["pending", "verified"],
    default: "pending",
  },
}, { timestamps: true });

const model = mongoose.model("Order", schema);

module.exports = model;
