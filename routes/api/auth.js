const express = require("express");

const ctrl = require("../../controlers/auth");

const { validateData } = require("../../middlewares/validateData");

const authenticate = require("../../middlewares/authenticate");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateData(schemas.registerSchema), ctrl.register);

router.post("/login", validateData(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateData(schemas.updateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
