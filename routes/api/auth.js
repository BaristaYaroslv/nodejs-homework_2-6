const express = require("express");
const authController = require("../../controllers/auth");
const {
	validateBody,
	authenticate,
	isValidId,
} = require("../../middleWares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), authController.register);

router.post("/login", validateBody(schemas.loginSchema), authController.login);

router.get("/current", authenticate, authController.getCurrent);

router.post("/logout", authenticate, authController.logout);

router.patch(
	"/:userId/subscription",
	authenticate,
	isValidId,
	validateBody(schemas.updateSubscriptionSchema),
	authController.updateSubscriptionUser
);

module.exports = router;