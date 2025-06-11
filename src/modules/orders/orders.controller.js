const { isValidObjectId } = require("mongoose");
const Order = require("../../models/Order");
const User = require("../../models/User");
const Product = require("../../models/Product");
const { createPayment, verifyPayment } = require("../../services/zarinpal");

exports.userOrders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const sortField = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  
      const filter = {
        status: "verified",
        userID : req.user._id
      };
        
      const orders = await Order.find(filter)
        .populate("products.productID")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);

        const total = await Product.countDocuments(filter)
  
      return res.status(200).json({
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "خطای سرور!", error });
    }
};

exports.orders = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const sortField = req.query.sortBy || "createdAt";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
  
      const filter = {
        status: "verified"
      };
        
      const orders = await Order.find(filter)
        .populate("products.productID")
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit);

        const total = await Product.countDocuments(filter)
  
      return res.status(200).json({
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "خطای سرور!", error });
    }
};

exports.checkout = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "سبد خرید خالی است!" });
    }

    let totalAmount = 0;
    const validItems = [];

    for (const item of items) {
      if (!isValidObjectId(item.productID)) {
        return res
          .status(400)
          .json({ message: `آیدی محصول ${item.productID} معتبر نیست.` });
      }

      const product = await Product.findById(item.productID);
      if (!product) {
        return res
          .status(404)
          .json({ message: `محصول ${item.productID} پیدا نشد.` });
      }

      validItems.push({
        productID: item.productID,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    if (totalAmount <= 0) {
      return res.status(400).json({ message: "مبلغ کل سفارش معتبر نیست." });
    }

    const amountInRial = totalAmount * 10;

    const payment = await createPayment({
      amountInRial,
      description: `پرداخت سفارش کاربر با شناسه ${req.user._id}`,
      mobile: req.user.phone || "",
    });

    const order = new Order({
      userID: req.user._id,
      products: validItems,
      totalPrice: totalAmount,
      status: "pending",
      paymentAuthority: payment.authority,
    });

    await order.save();

    return res.status(201).json({
      message:
        "سفارش با موفقیت ثبت شد. برای تکمیل پرداخت به لینک زیر مراجعه کنید.",
      paymentUrl: payment.paymentUrl,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res
      .status(500)
      .json({ message: "خطای سرور!", error: error.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { Authority, Status } = req.query;

    const order = await Order.findOne({ paymentAuthority: Authority });
    if (!order) {
      return res.status(404).json({ message: "سفارش پیدا نشد." });
    }

    if ((Status || "").trim().toUpperCase() === "OK") {
      const amountInRial = order.totalPrice * 10;
      const verifyResponse = await verifyPayment({
        amountInRial,
        authority: Authority,
      });

      if (verifyResponse.code === 100) {
        order.status = "verified";
        order.refId = verifyResponse.ref_id;
        await order.save();

        return res.json({ message: "پرداخت موفق بود. سفارش شما تایید شد." });
      } else {
        return res.json({
          message: "پرداخت ناموفق بود. لطفا دوباره تلاش کنید.",
        });
      }
    } else {
      return res.json({ message: "پرداخت لغو شد یا ناموفق بود." });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({ message: "خطای سرور در تایید پرداخت." });
  }
};
