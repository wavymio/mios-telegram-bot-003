const { Router } = require('express')
const router = Router()
const { sendMessage, replyToMessage, replyToCommand } = require('../api/sendMessage')
const { commands } = require('../config/commands')
const processText = require('../api/geminiAI.js')
const { saveUserData } = require('../functions/saveUserData.js')

router.post('/', async (req, res) => {
    const userData = req.body
    const message = userData.message || userData.edited_message
    // console.log(userData)

    saveUserData(userData)

    if (message.text.startsWith('/')) {
        const words = message.text.substring(1).split(' ')

        switch (words.length) {
            case 1:
                commands(`/${words[0]}`, userData)
                break
            default:
                replyToMessage(message.chat.id, message.message_id, "I do not recognise that command noob")
                break
        }
    } else {
        const processedText = await processText(message.text)
        console.log(processedText)
        replyToMessage(message.chat.id, message.message_id, processedText)
    }

    res.sendStatus(200)
})

module.exports = router