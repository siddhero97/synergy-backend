const ContactService = require('./contact.service');

const getContacts = async (req, res, next) => {
    // Implement your logic to get contacts
    try {
        const contacts = await ContactService.getContacts();
        res.json(contacts);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        res.json(await ContactService.createContact(userId,req.body));
    } catch (err) {
        console.error(`Error while creating users`, err.message);
        next(err);
    }
};

const addNote = async (req, res, next) => {
    // Implement your logic to add a note to a contact
    try {
        const userId = req.params.userId;
        const contactId = req.params.contactId;
        res.json(await ContactService.addNoteToContact(userId, contactId, req.body.note));
    } catch (err) {
        console.error(`Error while adding note to contact`, err.message);
        next(err);
    }
};

const remove = async (req, res, next) => {
    // Implement your logic to remove a contact
    try {  
        const userId = req.params.userId;
        const contactId = req.params.contactId;
        res.json(await ContactService.removeContact(userId,contactId));
    } catch (err) {
        console.error(`Error while removing users`, err.message);
        next(err);
    }
};

module.exports = {
    getContacts,
    create,
    addNote,
    remove
};