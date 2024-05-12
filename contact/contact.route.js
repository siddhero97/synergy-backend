const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');

/* GET contacts. */
router.get('/', contactController.getContacts);

/* POST contact */
router.post('/create/:userId', contactController.create);

/* PUT contact */
router.put('/addNote/:userId/:contactId', contactController.addNote);

/* DELETE contact */
router.delete('/:userId/:contactId', contactController.remove);




module.exports = router;