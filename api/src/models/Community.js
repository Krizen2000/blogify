const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    communityId: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
  },
  { timestamps: false }
);

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
