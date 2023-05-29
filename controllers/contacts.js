const contacts = require("../models/contacts/contacts");
const { HttpError, ControllerWrapper } = require("../utils/index");

const validationContact = require("../shemas/validationContact");

const listContacts = async (res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }   
};

const getContactById = async (req, res) => {
   try {
     const {contactId} = req.params;
     const result = await contacts.getContactById(contactId);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Not found. Contact with such id doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.removeContact(contactId);
  if(!result) {
    throw HttpError(404, "Not found. Contact with such id didn't exist");
  };
  res.json({"message": "contact deleted"});
};

const addContact = async (req, res) => {
  const resultValidation = await validationContact(req.body);
  if (resultValidation) {
    res.status(400).json({ message: resultValidation });
    return;
  }

  try {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  const resultValidation = await validationContact(req.body);
  if (resultValidation) {
    res.status(400).json({ message: resultValidation });
    return;
  }

  const { contactId } = req.params;
  try {
    const result = await contacts.updateContact(contactId, req.body);

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listContacts: ControllerWrapper(listContacts),
  getContactById: ControllerWrapper(getContactById),
  removeContact: ControllerWrapper(removeContact),
  addContact: ControllerWrapper(addContact),
  updateContact: ControllerWrapper(updateContact)
};