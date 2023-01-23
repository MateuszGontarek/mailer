const express = require('express');
const router = express.Router();
const userService = require('./service');

router.post('/api/user', userService.addUser)
router.get('/api/user', userService.getUsers)
router.delete('/api/user', userService.deleteUser)
router.get('/api/user-email-get', userService.getEmail)
module.exports = router;
    