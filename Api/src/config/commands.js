const { sendMessage, replyToMessage, replyToCommand } = require('../api/sendMessage')
const listCommands = require('../commands/listCommands')
const startMessage = require('../commands/start')

const commands = (command, userData) => {
    const message = userData.message || userData.edited_message

    switch (command) {
        case '/start':
            replyToMessage(message.chat.id, message.message_id, startMessage())
            break
        case '/commands':
            replyToMessage(message.chat.id, message.message_id, listCommands())
            break
        default: 
            replyToMessage(message.chat.id, message.message_id, "I'm not familiar with this command")
            break
    }
}

module.exports = {
    commands
}