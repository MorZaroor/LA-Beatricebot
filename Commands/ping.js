const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! :3'),
    async execute(interaction) {
        await interaction.reply('Pong! :3')
    }
}