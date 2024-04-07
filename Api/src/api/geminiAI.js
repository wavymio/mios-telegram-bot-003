const { GoogleGenerativeAI } = require("@google/generative-ai");
const getRandomResponse = require("../functions/randomResposes");
const getRandomErrorResponse = require("../functions/randomErrorResponses");

const geminiApiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(geminiApiKey)

const processText = async (userText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"})

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: userText }],
                },
                {
                    role: "model",
                    parts: [{ text: getRandomResponse() }],
                }
            ],
            generationConfig: {
                maxOutputTokens: 100,
                temperature: 1.0, 
            }
        })

        const result = await chat.sendMessage(userText)
        const response = await result.response
        const responseText = response.text()
        // console.log(responseText)
        return responseText
    } catch (err) {
        if (err.response && err.response.promptFeedback && err.response.promptFeedback.blockReason === 'SAFETY') {
            console.log("sendMessage() was unsuccessful. Response was blocked due to SAFETY.")
            console.log(err.response)
            return getRandomErrorResponse()
        } else {
            console.log(err)
            const responseText = `Yo some error occured\nWait a while and then try again\nContact this guy if the issue persists @wavymio`
            return responseText
        }
    }
  
}

module.exports = processText