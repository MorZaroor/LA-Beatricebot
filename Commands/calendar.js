const { SlashCommandBuilder } = require('@discordjs/builders')
const { parseCalendar } = require("../calendar.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calendar')
        .setDescription('Replies with calendar events output for the day.'),
    async execute(interaction) {
        // await interaction.channel().bulkDelete(100, true)
        // await interaction.reply(await parseCalendar())
    }
}