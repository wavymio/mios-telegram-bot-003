const getRandomMisunderstanding = () => {
    const shortResponses = [
        "Only send texts to me, not this crap",
        "Speak english nigga",
        "Bro say it in a way I can understand or get lost"
    ]
    
    const randomIndex = Math.floor(Math.random() * shortResponses.length);
    return shortResponses[randomIndex];
}

module.exports = getRandomMisunderstanding



