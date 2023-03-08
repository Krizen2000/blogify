const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    blogId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
    publisher: { type: String, required: true },
    tags: { type: [String], required: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
