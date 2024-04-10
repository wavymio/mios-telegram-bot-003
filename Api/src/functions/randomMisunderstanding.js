const getRandomMisunderstanding = () => {
    const shortResponses = [
        "Sorry I don't understand you",
        "Come again?",
        "Say it again",
        "Speak english nigga",
        "Repeat whay you said",
        "Bro say it in a way I can understand or get lost"
    ]
    
    const randomIndex = Math.floor(Math.random() * shortResponses.length);
    return shortResponses[randomIndex];
}

module.exports = getRandomMisunderstanding



