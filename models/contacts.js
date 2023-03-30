const fs = require("fs/promises");
const path = require("path");
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const contactById = contacts.find((item) => item.id === contactId.toString());
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex((item) => item.id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(
    (item) => item.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
};

const addContact = async ({name,email,phone}) => {
  const contacts = await getListContacts();
  const addedContact = {
    name,
    email,
    phone,
    id: uuidv4(),
  };
  contacts.push(addedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return addedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
  return books[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
