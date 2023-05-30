const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const validationContact = require("../services/validationContact");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const contacts = await getContactById(req.params.contactId);

    if (contacts) {
      res.json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postContact = async (req, res, next) => {
  // * Validation
  const resultValidation = await validationContact(req.body);
  if (resultValidation) {
    res.status(400).json({ message: resultValidation });
    return;
  }

  try {
    const contacts = await addContact(req.body);
    res.status(201).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const putContact = async (req, res, next) => {
  // * Validation
  const resultValidation = await validationContact(req.body);
  if (resultValidation) {
    res.status(400).json({ message: resultValidation });
    return;
  }

  const contactId = req.params.contactId;
  try {
    const contacts = await updateContact(contactId, req.body);

    if (contacts) {
      res.json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);

    if (contacts) {
      res.json(contacts);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getContacts,
  getOneContact,
  postContact,
  putContact,
  deleteContact,
};
