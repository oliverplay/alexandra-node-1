// Importing the contactsActions module from the "contacts.js" file
const contactsActions = require("./contacts");

// Importing the "yargs" module and storing the parsed command-line arguments in "argv"
const argv = require("yargs").argv;

// Function to invoke various actions based on the provided command-line arguments
const invokeAction = async ({ action, id, name, email, phone }) => {
  // Using a switch statement to handle different actions
  switch (action) {
    case "list":
      // When the action is "list", retrieve and display all contacts
      const contacts = await contactsActions.listContacts();
      console.table(contacts); // Display the contacts in a tabular format
      break;

    case "get":
      // When the action is "get", retrieve and display a contact by its ID
      const contact = await contactsActions.getContactById(id);
      console.log(contact); // Display the contact object
      break;

    case "add":
      // When the action is "add", add a new contact using the provided name, email, and phone
      const addContact = await contactsActions.addContact(name, email, phone);
      console.log(addContact); // Display the newly added contact object
      break;

    case "remove":
      // When the action is "remove", remove a contact based on the provided ID
      const removeContact = await contactsActions.removeContact(id);
      console.log(removeContact); // Display the result of the removal operation
      break;

    default:
      // If an unknown action is provided, display a warning message in red color
      console.warn("\x1B[31m Unknown action type!");
  }
};

// Function to start the application and perform the specified action
const start = async (argv) => {
  try {
    await invokeAction(argv); // Invoke the action based on the parsed command-line arguments
  } catch (error) {
    console.log(error); // If any error occurs during execution, log the error message
  }
};

// Starting the application by calling the start function with the parsed command-line arguments
start(argv);
