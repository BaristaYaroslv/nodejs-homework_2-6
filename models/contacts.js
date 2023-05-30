const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function readFile() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function writeFile(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await readFile();
  return contacts;
};

const getIndexContactById = (contactId, contacts) => {
  return contacts.findIndex((contact) => contact.id === contactId);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact) => contact.id === contactId);
  return foundContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexFoundElement = getIndexContactById(contactId, contacts);

  if (indexFoundElement < 0) return null;

  const removeContacts = contacts.splice(indexFoundElement, 1);
  await writeFile(contacts);

  return removeContacts;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };

  contacts.push(newContact);
  await writeFile(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const newContact = { id: contactId, name, email, phone };

  const contacts = await listContacts();
  const indexFoundElement = getIndexContactById(contactId, contacts);

  if (indexFoundElement < 0) return null;

  contacts.splice(indexFoundElement, 1, newContact);
  await writeFile(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
