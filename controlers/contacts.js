// const Joi = require("joi");

const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../helpers");

// const contactAddSchema = Joi.object({
//   name: Joi.string()
//     .required()
//     .messages({ "any.required": `missing name field` }),
//   email: Joi.string()
//     .required()
//     .messages({ "any.required": `missing email field` }),
//   phone: Joi.string()
//     .required()
//     .messages({ "any.required": `missing phone field` }),
// });

const list = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const contact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const add = async (req, res, next) => {
  // const { error } = contactAddSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
  console.log(req.body);
};

const change = async (req, res, next) => {
  // const { error } = contactAddSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, (error.message = `missing fields`));
  // }
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
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
  remove: ctrlWrapper(remove),
};
