const commands = [
    '/start',
    '/commands'
]

const listCommands = () => {
    const responseText = `These are my commands\nUse them to touch me inappropriately\n\n${commands.map(command => command).join('\n')} `
    return responseText
}

module.exports = listCommands