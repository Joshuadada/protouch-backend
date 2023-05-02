const express = require('express');
const router = express.Router();
const cakeContactController = require('../controllers/cakeContactController');

// Send contact
router.post('/', cakeContactController.sendContact);

module.exports = router;