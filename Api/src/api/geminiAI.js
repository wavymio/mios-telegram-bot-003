const { GoogleGenerativeAI } = require("@google/generative-ai");
const getRandomResponse = require("../functions/randomResposes");
const getRandomErrorResponse = require("../functions/randomErrorResponses");
const { sendTypingAction } = require("./sendMessage");
const getRandomMisunderstanding = require("../functions/randomMisunderstanding");

const geminiApiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(geminiApiKey)

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

const processText = async (userText, chatId) => {
    try {
        if (!userText) {
            console.error('Empty or undefined message text received.')
            await sendTypingAction(chatId)
            const responseText = getRandomMisunderstanding()
            return responseText
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        conversationHistory.push({
            role: "user",
            parts: [{ text: userText }],
        })

        conversationHistory.push({
            role: "model",
            parts: [{ text: getRandomResponse() }],
        })

        await sendTypingAction(chatId)

        const chat = model.startChat({
            history: conversationHistory,
            generationConfig: {
                maxOutputTokens: 100,
                temperature: 1.0, 
            }
        })

        const result = await chat.sendMessage(userText)
        const response = await result.response
        let responseText = response.text()

        if (!responseText) {
            console.warn('Empty response text received.')
            responseText = getRandomMisunderstanding() 
        }
        // console.log(responseText)

        // conversationHistory = []

        return responseText
    } catch (err) {
        if (err.response && err.response.promptFeedback && err.response.promptFeedback.blockReason === 'SAFETY') {
            await sendTypingAction(chatId)
            console.log("sendMessage() was unsuccessful. Response was blocked due to SAFETY.")
            console.log(err.response)
            return getRandomErrorResponse()
        } else {
            await sendTypingAction(chatId)
            console.log(err)
            const responseText = `Yo some error occured\nWait a while and then try again\nContact this guy if the issue persists @wavymio`
            return responseText
        }
    }
  
}

module.exports = processText