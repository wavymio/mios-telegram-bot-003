const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number, 
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    languageCode: {
        type: String
    }
})

const User = new mongoose.model("users", userSchema)

module.exports = User