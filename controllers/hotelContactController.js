const HotelContactModel = require('../models/hotelContactModel');

// Handle error function
const handleError = (err) => {
    let errors = { name: '', email: '', message: '', subject: '' }
    
    if (err.message.includes('hotelContact validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message
      })
      return errors
    }
  }

const sendContact = async (req, res, next) => {
    const {name, email, message, subject} = req.body;

    try{
        hotelContact = await HotelContactModel.create({name, email, message, subject})
        res.status(201).json({
            hasError: false,
            message: 'Message sent successfully',
            data: hotelContact
        })
    } catch (err) {
        const errors = handleError(err)
        res.status(401).json({
            hasError: true,
            message: errors.name || errors.email || errors.subject || errors.message
        })
    }
}

module.exports = { sendContact }