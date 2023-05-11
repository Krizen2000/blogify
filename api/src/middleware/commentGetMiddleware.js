async function commentGetMiddleware(req, res, next) {
  if (req.query.blogId) {
    req.body.searchVia = "blogId";
  } else if (req.query.username) {
    req.body.searchVia = "username";
  } else if (req.query.community) {
    req.body.searchVia = "communityId";
  } else {
    req.body.searchVia = null;
  }
  next();
}

module.exports = commentGetMiddleware;
