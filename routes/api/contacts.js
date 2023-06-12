const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId,authenticate } = require("../../middleWares");
const { schemas } = require("../../models/contact");
const {validateRequestBody} = require("../../helpers");

router.get("/",
	authenticate,
	ctrl.listContacts
);

router.get("/:contactId",
	authenticate,
	isValidId,
	ctrl.getContactById
);
	
router.post("/",
	authenticate,
	validateBody(schemas.addSchema),
	ctrl.addContact
);

router.put(
	"/:contactId",
	authenticate,
	isValidId,
	validateRequestBody,
	validateBody(schemas.addSchema),
	ctrl.changeContact
);

router.patch(
	"/:contactId/favorite",
	authenticate,
	isValidId,
	validateRequestBody,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateStatusContact
);

router.delete("/:contactId",
	authenticate,
	isValidId,
	ctrl.removeContact
);

module.exports = router;
