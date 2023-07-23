// Importing the required Node.js modules and libraries
const path = require("path"); // Path module for working with file and directory paths
const fs = require("fs/promises"); // Promisified version of the file system module
const { v4 } = require("uuid"); // Generates unique IDs (UUIDs)

// Resolving the path to the "contacts.json" file
const contactsPath = path.resolve("db/contacts.json");

// Function to retrieve and return all contacts from the "contacts.json" file
async function listContacts() {
  const contacts = JSON.parse(await fs.readFile(contactsPath)); // Read the file and parse its content as JSON
  return contacts; // Return the list of contacts
}

// Function to retrieve a contact by its ID
async function getContactById(contactId) {
  const contacts = await listContacts(); // Get all contacts
  const result = contacts.find((item) => item.id === contactId.toString()); // Find the contact with the specified ID
  if (!result) {
    return null; // If the contact doesn't exist, return null
  }
  return result; // Return the found contact
}

// Function to remove a contact by its ID
async function removeContact(contactId) {
  const contacts = await listContacts(); // Get all contacts
  const newContacts = contacts.filter(({ id }) => id !== contactId.toString()); // Filter out the contact with the specified ID
  await fs.writeFile(contactsPath, JSON.stringify(newContacts)); // Write the updated contacts list back to the file
  return newContacts; // Return the updated list of contacts
}

// Function to add a new contact with the provided name, email, and phone
async function addContact(name, email, phone) {
  const contacts = await listContacts(); // Get all contacts
  const newContact = {
    id: v4(), // Generate a unique ID for the new contact
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, newContact]; // Add the new contact to the existing list
  await fs.writeFile(contactsPath, JSON.stringify(newContacts)); // Write the updated contacts list back to the file
  return newContact; // Return the newly added contact
}

// Exporting the functions to make them accessible from other parts of the application
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
