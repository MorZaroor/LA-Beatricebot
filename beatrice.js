require('dotenv').config();
const { clientToken } = require('./config.js');
const { parseCalendar } = require('./calendar.js');
const { Client, Intents } = require('discord.js');
const myIntents = new Intents();

myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS);

const client = new Client({ intents: myIntents });

require('./Handlers/Events.js')(client);
// require('./Handlers/Commands.js')(client);

// client.once('ready', () => {
//   console.log('Ready!');
//   setInterval(() => {
//     const cet = new Date().toLocaleString('en-US', { timeZone: 'CET' });
//     let cet_obj = new Date(cet);
//     client.user.setActivity('In-game time ' + ('0' + cet_obj.getHours()).slice(-2) + ':' + ('0' + cet_obj.getMinutes()).slice(-2))
//   }, 40000);
// })

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  console.log(`Received >>${interaction}<<.`);

  const {commandName} = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong! :3');
  }
})

client.on('messageCreate', async message => {
  {
    const input = message.content.toLowerCase().replace(/ +(?= )/g, '');
    if (input === '!ping') {
      await message.reply('Pong! :3');
    }
    else if (input === '!calendar') {
      await parseCalendar(message);
    }
    else if (input === '!clear') {
      message.guild.channels.cache.find(i => i.name === 'bot-test').bulkDelete(100, true);
    }
  }
});

client.login(clientToken).then(() => console.log(`Logged in as ${client.user.tag}!`));