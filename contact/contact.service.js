const Contact = require('./contact.model'); // Assuming you have a Contact model

const getContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

const createContact = async (contactData) => {
    const data = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        linkedinUrl: contactData.linkedinUrl,
        notes: contactData.notes || []
    };
    console.log("createContact -> data", data)
    const contact = new Contact(data);
    const savedContact = await contact.save();
    return savedContact;
};

const addNoteToContact = async (contactId, body) => {
    const contact = await Contact.findById(contactId);
    console.log("contact", contact);
    if (typeof body.note === "string") {
        contact.notes.push(body.note);
    } else if (typeof body.note === "array") {
        contact.notes += body.note;
    }

    const savedContact = await contact.save();
    return savedContact;
};

const removeContact = async (contactId) => {
    const contact = await Contact.findById(contactId);
    await contact.remove();
    return contact;

}
module.exports = {
    getContacts,
    createContact,
    addNoteToContact,
    removeContact

};