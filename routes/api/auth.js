const express = require("express");
const ctrl = require("../../controllers/auth");
const {
	validateBody,
	authenticate,
	upload,
	validateFile,
	isValidId,
} = require("../../middleWares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
	"/:userId/subscription",
	authenticate,
	isValidId,
	validateBody(schemas.updateSubscriptionSchema),
	ctrl.updateSubscriptionUser
);

router.patch(
  "/avatars",
	authenticate,
  validateFile(),
  upload.single("avatar"),
  ctrl.changeAvatar
);

module.exports = router;