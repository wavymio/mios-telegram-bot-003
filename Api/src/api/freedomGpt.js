const axios = require('axios')
const apiUrl = process.env.FREEDOMGPT_API_URL
const freedomGptApiKey = process.env.FREEDOMGPT_API_KEY
const getRandomMisunderstanding = require("../functions/randomMisunderstanding")
const { sendTypingAction } = require("./sendMessage")

let conversationHistory = []

function calculateDelayUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0) // Set to next midnight
    return midnight - now // Calculate the difference in milliseconds
}

// Function to clear conversation history
function clearConversationHistory() {
    conversationHistory = []
    console.log("Conversation history cleared.")
}

// Calculate the initial delay until the next midnight
const initialDelay = calculateDelayUntilMidnight();

// Set timeout to clear conversation history at midnight every day
setTimeout(() => {
    clearConversationHistory();
    setInterval(clearConversationHistory, 24 * 60 * 60 * 1000) // Repeat every 24 hours
}, initialDelay)

const processFreeMessages = async (userText, chatId) => {
    try {
        if (!userText) {
            console.error('Empty or undefined message text received.')
            await sendTypingAction(chatId)
            const responseText = getRandomMisunderstanding()
            return responseText
        }

        await sendTypingAction(chatId)

        conversationHistory.push({
            "role": "user",
            "content": userText
        })
        
        const response = await axios.post(apiUrl, {
            "apiKey": freedomGptApiKey,
            "messages": conversationHistory,
            "temperature": 1.2,
            "top_k": 40,
            "top_p": 0.8,
            "repetition_penalty": 1.1,
            "batch_size": 4,
            "max_new_tokens": 512
        })

        console.log(response.data.data.output)
        console.log(response.data)

        // if (!response.data || !response.data.output) {
        //     const responseText = "I feel wierd, please give me a moment"
        //     return responseText
        // }
  
        const responseText = response.data.data.output.content
        
        return responseText
      
    } catch (err) {
        await sendTypingAction(chatId);
        console.error("An unexpected error occurred:", err)
        const responseText = `Yo some error occurred\nWait a while and then try again\nContact this guy if the issue persists @wavymio`
        return responseText
    }
}

module.exports = processFreeMessages
