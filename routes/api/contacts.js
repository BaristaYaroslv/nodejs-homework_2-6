const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const schemas = require("../../schemas");
const {validateBody} = require("../../decorators")
const {validateRequestBody} = require("../../helpers");


router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), contactsController.addContact);

router.delete("/:id", contactsController.deleteContactById);

router.put("/:id",validateRequestBody, validateBody(schemas.contactAddSchema), contactsController.updateContactById);

module.exports = router;
