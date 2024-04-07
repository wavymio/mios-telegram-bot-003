const User = require('../models/users')
const Message = require('../models/messages')

const saveUserData = async (update) => {
    try {
        const message = update.message || update.edited_message

        const isEdit = !!update.edited_message

        // Save user data
        const user = await User.findOne({ userId: message.from.id })
        if (!user) {
            const newUser = new User({
                userId: message.from.id,
                firstName: message.from.first_name,
                lastName: message.from.last_name,
                username: message.from.username,
                languageCode: message.from.language_code
            })
            await newUser.save()
        } else {
            if (message.from.first_name !== user.firstName || message.from.last_name !== user.lastName || message.from.username !== user.username || message.from.language_code !== user.languageCode) {
                user.firstName = message.from.first_name
                user.lastName = message.from.last_name
                user.username = message.from.username
                user.languageCode = message.from.language_code

                await user.save()
            }
        }

        // Deal with messages
        let newMessage
        if (isEdit) {
            newMessage = await Message.findOneAndUpdate(
                { messageId: message.message_id },
                { text: message.text, isEdited: true },
                { new: true }
            )
        } else {
            newMessage = new Message({
                user: user._id,
                messageId: message.message_id,
                date: new Date(message.date * 1000),
                text: message.text,
                replyToMessageId: message.reply_to_message ? message.reply_to_message.message_id : 0,
                isEdited: false
            })

            await newMessage.save()
        }

        console.log('User details and message processed successfully.')
    } catch (err) {
        console.log("Error saving data", err)
    }
}

module.exports = {
    saveUserData
}