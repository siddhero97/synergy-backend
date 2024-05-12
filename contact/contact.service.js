const { getUserById, updateUser } = require('../user/user.service');
const { generateUUID } = require('../utils');
const Contact = require('./contact.model'); // Assuming you have a Contact model

const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

const createContact = async (userId,contactData) => {
    const data = {
        id: generateUUID(),
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        linkedinUrl: contactData.linkedinUrl,
        notes: contactData.notes || ""
    };

    const user = await getUserById(userId);
    user.contacts.push(data);
    const savedContact = await updateUser(userId,user);
    return savedContact;
};

const addNoteToContact = async (userId,contactId, body) => {
    const user = await getUserById(userId);
    contactIndex = user.contacts.findIndex(contact => contact.id === contactId);
    user.contacts[contactIndex].notes = body;
    const savedUser = await updateUser(userId,user);
    const savedContact = savedUser.contacts[contactIndex];
    console.log("For user:", user.firstName, " ", user.lastName, "contact updated:", savedContact);
    return savedContact;
};

const removeContact = async (userId,contactId) => {
    const user = await getUserById(userId);
    contactIndex = user.contacts.findIndex(contact => contact.id === contactId);
    const contact = user.contacts[contactIndex];
    user.contacts.slice(contactIndex,1);
    const savedUser = await updateUser(userId,user);
    console.log("For user:", user.firstName, " ", user.lastName, "contact removed", contact);
    return contact;
}
module.exports = {
    getContacts,
    createContact,
    addNoteToContact,
    removeContact
};