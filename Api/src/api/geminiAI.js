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
                maxOutputTokens: 1000,
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
    console.error("Error caught:", err);
        if (err.response) {
            console.log("Response:", err.response);
            if (err.response && err.response.candidates && err.response.candidates[0].finishReason === 'SAFETY') {
                await sendTypingAction(chatId);
                console.log("sendMessage() was unsuccessful. Response was blocked due to SAFETY.");
                console.log("Error:", err);
                console.log("Response:", err.response);
                console.log("Block Reason:", err.response.promptFeedback.blockReason);
                // Clear conversation history when safety error occurs
                conversationHistory = [];
                return getRandomErrorResponse();
            }
        }
        await sendTypingAction(chatId);
        console.error("An unexpected error occurred:", err);
        const responseText = `Yo some error occurred\nWait a while and then try again\nContact this guy if the issue persists @wavymio`;
        return responseText;
}

}

module.exports = processText
