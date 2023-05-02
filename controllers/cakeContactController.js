const CakeContactModel = require('../models/cakeContactModel');

// Handle error function
const handleError = (err) => {
    let errors = { name: '', email: '', message: '', subject: '' }

    if (err.message.includes('cakeContact validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
        return errors
    }
}

const sendContact = async (req, res, next) => {
    const { name, email, message, subject } = req.body;

    try {
        cakeContact = await CakeContactModel.create({ name, email, message, subject })
        res.status(201).json({
            hasError: false,
            message: 'Message sent successfully',
            data: cakeContact
        })
    } catch (err) {
        const errors = handleError(err)
        console.log(errors)
        res.status(401).json({
            hasError: true,
            message: errors.name || errors.email || errors.subject || errors.message
        })
    }
}

module.exports = { sendContact }