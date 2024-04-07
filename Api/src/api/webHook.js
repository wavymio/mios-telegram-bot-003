// bot hook configuration
const axios = require('axios')

const webhookCall = () => {
    const webhookUrl = process.env.WEBHOOK_URL
    const botToken = process.env.BOT_TOKEN
    const apiUrl = `${process.env.API_URL}${botToken}`

    axios.post(`${apiUrl}/setWebhook?url=${webhookUrl}`)
    .then(response => {
        console.log('Webhook set successfully:', response.data);
    })
    .catch(error => {
        console.error('Error setting webhook:', error);
    })
}

module.exports = {
    webhookCall
}