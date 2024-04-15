const axios = require('axios')
const apiUrl = process.env.FREEDOMGPT_API_URL
const freedomGptApiKey = process.env.FREEDOMGPT_API_KEY
const getRandomMisunderstanding = require("../functions/randomMisunderstanding")
const { sendTypingAction } = require("./sendMessage")

const processFreeMessages = async (userText, chatId) => {
    try {
        if (!userText) {
            console.error('Empty or undefined message text received.')
            await sendTypingAction(chatId)
            const responseText = getRandomMisunderstanding()
            return responseText
        }

        await sendTypingAction(chatId)
        
        const response = await axios.post(apiUrl, {
            "apiKey": freedomGptApiKey,
            "messages": [
              {
                "role": "user",
                "content": userText
              }
            ],
            "temperature": 0.7,
            "top_k": 40,
            "top_p": 0.8,
            "repetition_penalty": 1.1,
            "batch_size": 4,
            "max_new_tokens": 512
        })

        console.log(response)

        if (!response.data) {
            const responseText = "I feel wierd, please give me a moment"
        }
  
        const responseText = response.data.output.content
        

        return responseText
      
    } catch (err) {
        await sendTypingAction(chatId);
        console.error("An unexpected error occurred:", err)
        const responseText = `Yo some error occurred\nWait a while and then try again\nContact this guy if the issue persists @wavymio`
        return responseText
    }
}

module.exports = processFreeMessages
