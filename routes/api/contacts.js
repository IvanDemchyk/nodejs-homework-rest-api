const express = require("express");

const {
  list,
  contact,
  add,
  change,
  remove,
  changeFav,
} = require("../../controlers/contacts");

const { validateData, validateFav } = require("../../middlewares/validateData");

const isValidId = require("../../middlewares/isValidId");

const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, list);

router.get("/:id", authenticate, isValidId, contact);

router.post("/", authenticate, validateData(schemas.addSchema), add);

router.delete("/:id", authenticate, isValidId, remove);

router.put("/:id", authenticate, validateData(schemas.addSchema), change);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFav(schemas.updateFavSchema),
  changeFav
);

module.exports = router;
