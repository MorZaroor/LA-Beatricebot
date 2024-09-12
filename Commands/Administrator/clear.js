// const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js')

// module.exports = {
//     /**
//      * @param {CommandInteraction} interaction
//      */
//     data: new SlashCommandBuilder()
//         .setName('clear')
//         .setDescription('Clears last 100 messages in the channel.'),
//     async execute(interaction) {
//         await interaction.channel.bulkDelete(100, true);
//     }
// }

module.exports = {
    name: 'clear',
    description: 'Clears last 100 messages in the channel.',
    permission: 'ADMINISTRATOR',
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.channel.bulkDelete(100, true);
    }
}