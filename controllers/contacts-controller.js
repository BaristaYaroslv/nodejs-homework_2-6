const { HttpError } = require("../helpers");
const contactsService = require("../models/contacts");
const {ctrlWrapper} = require("../decorators")


const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Contacts with ${id} not found`);
  }
  res.json(result);
};

  module.exports = {
    getAllContacts:ctrlWrapper(getAllContacts),
    getContactById:ctrlWrapper(getContactById),
    addContact:ctrlWrapper(addContact),
    deleteContactById:ctrlWrapper(deleteContactById),
    updateContactById:ctrlWrapper(updateContactById),
  }