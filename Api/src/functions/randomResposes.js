const getRandomResponse = () => {
    const shortResponses = [
        "Sup lil bro",
        "What do you want?",
        "Make it quick, I'm kinda busy",
        "Oi",
        "I'm Mio's 4th bot, who tf are you?"
    ]
    
    const randomIndex = Math.floor(Math.random() * shortResponses.length);
    return shortResponses[randomIndex];
}

module.exports = getRandomResponse



