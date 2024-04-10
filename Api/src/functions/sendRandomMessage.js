const { getChatId, sendMessage } = require("../api/sendMessage")

const sendRandomMessage = async (username, text) => {
    const chatId = await getChatId(username)
    console.log("log3", chatId)
    sendMessage(chatId, text)
}

module.exports = sendRandomMessage