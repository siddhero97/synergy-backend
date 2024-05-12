const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

/* GET programming languages. */
router.get('/', userController.get);

/* POST programming language */
router.post('/create', userController.create);


router.post('/login', userController.login);
/* PUT programming language */
router.put('/:id', userController.update);

/* DELETE programming language */
router.delete('/:id', userController.remove);

module.exports = router;