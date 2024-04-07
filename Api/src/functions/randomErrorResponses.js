const getRandomErrorResponse = () => {
    const shortResponses = [
        "Keep 18+ messages away from me or I'll block you",
        "Pervert",
        "I don't want to talk about that stuff",
        "Ew",
        "Help @wavymio",
        "womp womp",
        "shut up lil nigga"
    ]

    const randomIndex = Math.floor(Math.random() * shortResponses.length);
    return shortResponses[randomIndex];
}

module.exports = getRandomErrorResponse