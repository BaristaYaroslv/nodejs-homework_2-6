const express = require('express');
const { listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact } = require("../../controllers/contacts");
const {schemaValidationContact} = require("../../shemas");
const {validateBody} = require("../../middlewares");

const router = express.Router();

router.get('/', listContacts);
router.get('/:contactId', getContactById);
router.post('/', validateBody(schemaValidationContact), addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', validateBody(schemaValidationContact), updateContact);

module.exports = router;
