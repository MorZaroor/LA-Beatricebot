const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears last 100 channel.'),
    async execute(interaction) {
        await interaction.channel().bulkDelete(100, true)
    }
}