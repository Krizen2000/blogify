const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema(
  {
    communityId: { type: String, required: true, unique: true },
    creator: { type: String, required: true },
    imageUrl: { type: String, required: false },
    description: { type: String, required: true },
  },
  { timestamps: false }
);

const Community = mongoose.model("Community", CommunitySchema);
module.exports = Community;
