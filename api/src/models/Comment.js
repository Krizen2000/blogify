const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    blogId: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: false }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
