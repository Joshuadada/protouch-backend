const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { isEmail } = require('validator')

const cakeContactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Kindly input your name'],
    },
    email: {
        type: String,
        required: [true, 'Kindly input your email'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    subject: {
        type: String,
        required: [true, 'Kindly input the subject of your message'],
    },
    message: {
        type: String,
        required: [true, 'Kindly input your message'],
    }
})

const CakeContactModel = mongoose.model("cakeContact", cakeContactSchema);

module.exports = CakeContactModel;