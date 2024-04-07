const express = require('express')
const app = express()
const axios = require('axios')
const { webhookCall } = require('./api/webHook')
const dotenv = require('dotenv/config')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

// import routes
const userMessagesRoute = require('./routes/userMessages')

// middleware
app.use(express.json())

// call webhook
webhookCall()

// routes config
app.get('/health', (req, res) => {
    res.send("I am healthy")
})

app.use('/user-messages', userMessagesRoute)

app.listen(8080, () => {
    console.log("App connected successfuly on port 8080")
})