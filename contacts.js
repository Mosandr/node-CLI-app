const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(({ id }) => id.toString() === contactId);

    if (!contact) {
      throw Error("Incorrect id");
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const index = contactsList.findIndex(
      ({ id }) => id.toString() === contactId
    );

    if (index === -1) {
      throw Error("Incorrect id");
    }

    const filteredContacts = contactsList.filter(
      ({ id }) => id.toString() !== contactId
    );
    await rewriteFile(filteredContacts);
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };
  try {
    const contactsList = await listContacts();
    const updateContactsList = [...contactsList, newContact];
    await rewriteFile(updateContactsList);
    return newContact;
  } catch (error) {
    throw error;
  }
}

async function rewriteFile(contacts) {
  try {
    const stringifiedContacts = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, stringifiedContacts);
  } catch (error) {
    throw error;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
