const express = require("express");

const {
  list,
  contact,
  add,
  change,
  remove,
} = require("../../controlers/contacts");

const router = express.Router();

router.get("/", list);

router.get("/:id", contact);

router.post("/", add);

router.delete("/:id", remove);

router.put("/:id", change);

module.exports = router;
