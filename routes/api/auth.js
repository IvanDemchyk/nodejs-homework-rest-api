const express = require("express");

const ctrl = require("../../controlers/auth");

const { validateData } = require("../../middlewares/validateData");

const authenticate = require("../../middlewares/authenticate");

const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/users");

const router = express.Router();

router.post("/register", validateData(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateData(schemas.emailSchema), ctrl.resendUserEmail);

router.post("/login", validateData(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateData(schemas.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
