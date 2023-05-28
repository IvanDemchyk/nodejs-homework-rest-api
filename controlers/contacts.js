const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

// const { ctrlWrapper } = require("../helpers");

const list = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const favs = { owner };

  if (favorite !== undefined) {
    favs.favorite = favorite === "true";
  }

  const result = await Contact.find(favs, "", { skip, limit }).populate(
    "owner",
    "email"
  );
  res.json(result);
};

const contact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const change = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const changeFav = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  list: ctrlWrapper(list),
  contact: ctrlWrapper(contact),
  add: ctrlWrapper(add),
  change: ctrlWrapper(change),
  changeFav: ctrlWrapper(changeFav),
  remove: ctrlWrapper(remove),
};
