const Comment = require("../../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { productId, body, rating } = req.body;

    const comment = new Comment({
      userId: req.user._id,
      productId,
      body,
      rating,
    });

    await comment.save();

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

exports.getCommentsByProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const comments = await Comment.find({ productId })
        .populate('userId', 'username avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      const total = await Comment.countDocuments({ productId });
  
      res.status(200).json({
        comments,
        pagination: {
          total,
          page,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }
  };
  

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not delete comment", error: err.message });
  }
};
