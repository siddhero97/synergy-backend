const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('./user.controller');

/* GET users. */
router.get('/me', auth.authenticateToken, userController.getUserById);
router.get('/:userId', userController.getUserById)

/* POST user */
router.post('/create', userController.create);

router.post('/login', userController.login);
/* PUT user */
router.put('/', auth.authenticateToken, userController.update);

/* DELETE user */
router.delete('/', auth.authenticateToken, userController.remove);

module.exports = router;