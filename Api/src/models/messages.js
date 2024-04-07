const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    messageId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    replyToMessageId: { 
        type: Number,  
    },
    isEdited: {
        type: Boolean,
        default: false
    }
})

const Message = new mongoose.model("messages", messageSchema)

module.exports = Message