const Community = require("../models/Community");

// ? IMPLEMENT AUTHORIZATION OF ACTIONS FOR UPDATE,DELETE

async function getAllCommunities(req, res, next) {
  Community.find()
    .then((communities) => {
      if (!communities) {
        res.status(200).json({ communities: [] });
        return;
      }
      res.status(200).json({ communities });
    })
    .catch((err) => res.status(500).json(err));
}

async function getPopularCommunities(req, res, next) {
  Community.find()
    .sort({ createdAt: "desc" })
    .then((communities) => {
      if (!communities) {
        res.status(200).json({ communities: [] });
        return;
      }
      res.status(200).json({ communities });
    })
    .catch((err) => res.status(500).json(err));
}

async function getHiddenCommunities(req, res, next) {
  Community.find()
    .sort({ createdAt: "asc" })
    .then((communities) => {
      if (!communities) {
        res.status(200).json({ communities: [] });
        return;
      }
      res.status(200).json({ communities });
    })
    .catch((err) => res.status(500).json(err));
}

async function getCommunity(req, res, next) {
  Community.find({ communityId: req.query.communityId })
    .then((community) => {
      if (!community) {
        res.status(200).json();
        return;
      }
      res.status(200).json(community);
    })
    .catch((err) => res.status(500).json(err));
}

async function createCommunity(req, res, next) {
  const newCommunity = new Community(req.body);

  newCommunity
    .save()
    .then((savedCommunity) => res.status(200).json(savedCommunity))
    .catch((err) => res.status(500).json(err));
}

async function updateCommunity(req, res, next) {
  Community.findOneAndUpdate({ communityId: req.params.communityId }, req.body)
    .then(() => res.status(200))
    .catch((err) => res.status(500).json(err));
}

async function deleteCommunity(req, res, next) {
  Community.findOneAndDelete({ communityId: req.params.communityId })
    .then(() => res.status(200))
    .catch((err) => res.status(500).json(err));
}

module.exports = {
  getAllCommunities,
  getPopularCommunities,
  getHiddenCommunities,
  getCommunity,
  createCommunity,
  updateCommunity,
  deleteCommunity,
};
