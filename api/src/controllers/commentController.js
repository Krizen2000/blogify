const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

async function getCommentsByBlogId(req, res, next) {
  if (req.body.searchVia !== "blogId") {
    next();
    return;
  }

  Comment.find({ blogId: req.query.blogId })
    .limit(req.query.limit)
    .skip(req.query.page * req.query.limit)
    .sort({
      createdAt: "asc",
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((err) => res.status(500).json(err));
}

async function getCommentsByUsername(req, res, next) {
  if (req.body.searchVia !== "username") {
    next();
    return;
  }

  Comment.find({ username: req.query.username })
    .limit(req.query.limit)
    .skip(req.query.page * req.query.limit)
    .sort({
      createdAt: "asc",
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((err) => res.status(500).json(err));
}

async function getCommentsByCommunityId(req, res, next) {
  if (req.body.searchVia !== "communityId") {
    next();
    return;
  }

  Blog.findOne({ communities: req.query.community })
    .then(({ blogId }) => {
      Comment.find({ blogId })
        .limit(req.query.limit)
        .skip(req.query.page * req.query.limit)
        .sort({
          createdAt: "asc",
        })
        .then((comments) => res.status(200).json({ comments }))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
}

async function createComment(req, res, next) {
  const newComment = new Comment(req.body);

  newComment
    .save()
    .then(() => res.status(200))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getCommentsByBlogId,
  getCommentsByCommunityId,
  getCommentsByUsername,
  createComment,
};
