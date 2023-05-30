const express = require("express");

const {
  getContacts,
  getOneContact,
  postContact,
  putContact,
  deleteContact,
} = require("../../controllers/controllersContacts");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getOneContact);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", putContact);

module.exports = router;
