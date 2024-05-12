const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');

/* GET contacts. */
router.get('/', contactController.getContacts);

/* POST contact */
router.post('/create', contactController.create);

/* PUT contact */
router.put('/addNote/:contactId', contactController.addNote);

/* DELETE contact */
router.delete('/:contactId', contactController.remove);




module.exports = router;