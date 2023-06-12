const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middleWares");
const { schemas } = require("../../models/contact");
const {validateRequestBody} = require("../../helpers");

router.get("/", ctrl.listContacts);
router.get("/:contactId", isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.put(
	"/:contactId",
	isValidId,
	validateRequestBody,
	validateBody(schemas.addSchema),
	ctrl.changeContact
);
router.patch(
	"/:contactId/favorite",
	isValidId,
	validateRequestBody,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateStatusContact
);
router.delete("/:contactId", isValidId, ctrl.removeContact);

module.exports = router;
