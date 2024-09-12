// const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientToken, clientId, guildId } = require('./config.js');
const fs = require('node:fs');

// const commands = [
//     new SlashCommandBuilder().setName('ping').setDescription('Replies with pong.'),
//     new SlashCommandBuilder().setName('calendar').setDescription('Replies with calendar output for the day.'),
//     new SlashCommandBuilder().setName('clear').setDescription('Clears last 100 messages.'),
// ]
//     .map(command => command.toJSON());

const commands = [];
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(clientToken);

(async () => {
    try {
        console.log('Reloading application commands.');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log('Successfully reloaded application commands.');
    }
    catch (error) {
        console.error(error);
    }
})();

// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//     .then(() => console.log('Successfully registered application commands.'))
//     .catch(console.error)
