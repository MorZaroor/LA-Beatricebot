const { Client, CommandInteraction, MessageEmbed} = require('discord.js');
const { guildId } = require('../../config.js');


module.exports = {
    name: 'interactionCreate',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    async execute(client, interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered interaction >>${interaction}<<.`);
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply( {embeds: [
                new MessageEmbed()
                    .setColor("RED")
                    .setDescription("An error occurred while running the command.")
                ]}) && client.commands.delete(interaction.commandName);

            command.execute(client, interaction);
        }
    }
}