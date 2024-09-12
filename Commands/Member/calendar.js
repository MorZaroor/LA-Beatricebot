const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js')
const { parseCalendar } = require('../../calendar.js');

// module.exports = {
//     /**
//      * @param {CommandInteraction} interaction
//      */
//     data: new SlashCommandBuilder()
//         .setName('calendar')
//         .setDescription('Replies with calendar events output for the day.'),
//     async execute(interaction) {
//         await interaction.channel().bulkDelete(100, true);
//         await interaction.reply(await parseCalendar());
//     }
// }

module.exports = {
    name: 'calendar',
    description: 'Replies with calendar events output for the day.',
    permission: 'SEND_MESSAGES',
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.channel().bulkDelete(100, true);
        await interaction.reply(await parseCalendar());
    }
}