const express = require("express");

const {
  list,
  contact,
  add,
  change,
  remove,
  changeFav,
} = require("../../controlers/contacts");

const { validateData, validateFav } = require("../../validators/validateData");

const isValidId = require("../../validators/isValidId");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", list);

router.get("/:id", isValidId, contact);

router.post("/", validateData(schemas.addSchema), add);

router.delete("/:id", isValidId, remove);

router.put("/:id", validateData(schemas.addSchema), change);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFav(schemas.updateFavSchema),
  changeFav
);

module.exports = router;
