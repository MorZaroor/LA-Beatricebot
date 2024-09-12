// const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js')

// module.exports = {
//     /**
//      * @param {CommandInteraction} interaction
//      */
//     data: new SlashCommandBuilder()
//         .setName('ping')
//         .setDescription('Replies with Pong! :3')
//     async execute(interaction) {
//         await interaction.reply('Pong! :3');
//     }
// }

module.exports = {
    name: 'ping',
    description: 'Replies with Pong! :3',
    permission: 'ADMINISTRATOR',
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        interaction.reply( {content: 'Pong! :3'})
    }
}