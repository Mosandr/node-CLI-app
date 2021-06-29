const { Command } = require("commander");
const program = new Command();

const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "get":
      try {
        const contact = await contacts.getContactById(id);
        console.log(contact);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "add":
      try {
        await contacts.addContact(name, email, phone);
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "remove":
      try {
        await contacts.removeContact(id);
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
