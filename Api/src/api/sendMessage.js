const axios = require('axios')

const botToken = process.env.BOT_TOKEN
const apiUrl = `${process.env.API_URL}${botToken}`

const replyToCommand = async (chatId) => {
    try {
        const response = axios.post(`${apiUrl}/sendMessage`,{
            chat_id: chatId,
            text: "I have recieved your command"
        })

        console.log(response.data)
    } catch (err) {
        console.log(err)
    }
}

const sendMessage = async (chatId) => {
    try {
        const response = await axios.post(`${apiUrl}/sendMessage`,{
            chat_id: chatId,
            text: "I have recieved your text"
        })

        console.log(response.data)
    } catch (err) {
        console.log(err)
    }
    
}

const replyToMessage = async (chatId, messageId, responseText) => {
    try {
        const response = await axios.post(`${apiUrl}/sendMessage`,{
            chat_id: chatId,
            text: responseText,
            reply_to_message_id: messageId
        })

        // console.log(response.data)
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = {
    replyToCommand,
    sendMessage,
    replyToMessage
}