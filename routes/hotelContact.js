const express = require('express');
const router = express.Router();
const hotelContactController = require('../controllers/hotelContactController');

// Send contact
router.post('/', hotelContactController.sendContact);

module.exports = router;