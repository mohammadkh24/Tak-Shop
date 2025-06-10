const { isValidObjectId } = require("mongoose");
const User = require("../../models/User");
const { createPaginationData } = require("../../utils/pagination");

exports.getAll = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      users,
      pagination: createPaginationData(page, limit, totalUsers, "Users"),
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId == req.user._id) {
      return res.status(403).json({
        message: "You cant remove this user",
      });
    }

    const removedUser = await User.findOneAndDelete({
      _id: userId,
    });

    if (!removedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(404).json({
      message: "User removed successfully",
      user: removedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        message: "userId is not valid!",
      });
    }

    const user = await User.findOne({
      _id: userId,
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.changeRole = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        message: "userId is not valid!",
      });
    }

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    user.role = newRole;
    await user.save();

    return res.status(404).json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const { address, username } = req.body;

    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(403).json({
        message: "You cant edit this user",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const mediaUrlPath = `/images/${req.file.filename}`;

    user.address = address || user.address;
    user.avatar = mediaUrlPath || user.avatar;
    user.username = username || user.username;

    const editUser = await user.save();

    return res.status(200).json({
      message: "User updated succesfully",
      user: editUser,
    });
  } catch (error) {
    next(error);
  }
};
