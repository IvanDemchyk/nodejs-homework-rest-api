const express = require("express");

const {
  list,
  contact,
  add,
  change,
  remove,
} = require("../../controlers/contacts");

const validateData = require("../../validators/validateData");

const schema = require("../../schemas/schema");

const router = express.Router();

router.get("/", list);

router.get("/:id", contact);

router.post("/", validateData(schema), add);

router.delete("/:id", remove);

router.put("/:id", validateData(schema), change);

module.exports = router;
