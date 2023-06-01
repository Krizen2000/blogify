const Blog = require("../models/Blog");

async function getRecentBlogsHandler(req, res, next) {
  let blogs = null;
  try {
    blogs = await Blog.find().sort({ modifiedAt: "descending" }).limit(6);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!blogs) {
    res.status(200).json({ blogs: [] });
    return;
  }
  res.status(200).json({ blogs });
}

async function getAllBlogsHandler(req, res, next) {
  let blogs = null;
  try {
    blogs = await Blog.find().sort({ modifiedAt: "descending" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!blogs) {
    res.status(200).json({ blogs: [] });
    return;
  }
  res.status(200).json({ blogs });
}

async function getPublisherCreatedBlogsHandler(req, res, next) {
  let blogs = null;
  try {
    blogs = await Blog.find({ publisher: req.query.publisher });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  if (!blogs) {
    res.status(200).json({ blogs: [] });
    return;
  }
  res.status(200).json({ blogs });
}

async function getBlogHandler(req, res, next) {
  let blog = null;
  try {
    blog = await Blog.findOne({ blogId: req.params.blogId });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!blog) {
    res.status(404).json({ msg: "BLOG DOES NOT EXIST!" });
    return;
  }
  Blog.findOneAndUpdate(
    { blogId: req.params.blogId },
    { $inc: { viewCount: 1 } }
  ).exec();
  res.status(200).json(blog);
}

async function createBlogHandler(req, res, next) {
  console.log("createBlogHandler: ", req.body);
  const newBlog = new Blog({
    ...req.body,
    publisher: req.user.username,
  });

  let savedBlog = null;
  try {
    savedBlog = await newBlog.save();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  if (!savedBlog) {
    res.status(500).json({ msg: "SAVED BLOG NOT RETURNED!" });
    return;
  }
  res.status(200).json(savedBlog);
}

async function likeBlogHandler(req, res, next) {
  try {
    const blog = await Blog.findOneAndUpdate(
      { blogId: req.params.blogId },
      { $push: { likedBy: req.user.username } }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "BLOG CANNOT BE LIKED" });
    return;
  }
  res.status(200);
}

async function updateBlogHandler(req, res, next) {
  try {
    const blog = await Blog.findOne({ blogId: req.params.blogId });
    if (!blog) {
      res.status(404).json({ msg: "BLOG DOES NOT EXIST!" });
      return;
    } else if (blog.publisher !== req.user.username) {
      res.status().json({ msg: "USER IS NOT PUBLISHER!" });
      return;
    }
    const updatedBlog = await Blog.findOneAndUpdate(
      { blogId: req.params.blogId },
      req.body
    );
    if (!updatedBlog) {
      res.status(500).json({ msg: "UPDATED BLOG NOT RETURNED!" });
      return;
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
}

async function deleteBlogHandler(req, res, next) {
  try {
    const blog = await Blog.findOne({ blogId: req.params.blogId });
    if (!blog) {
      res.status(404).json({ msg: "BLOG DOES NOT EXIST!" });
      return;
    } else if (blog.publisher !== req.user.username) {
      res.status().json({ msg: "USER IS NOT PUBLISHER!" });
      return;
    }
    await Blog.findOneAndDelete({ blogId: req.params.blogId });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
    return;
  }
  res.status(200).json({ msg: "BLOG IS DELETED!" });
}

module.exports = {
  getRecentBlogsHandler,
  getAllBlogsHandler,
  getPublisherCreatedBlogsHandler,
  getBlogHandler,
  createBlogHandler,
  likeBlogHandler,
  updateBlogHandler,
  deleteBlogHandler,
};
