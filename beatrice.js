require('dotenv').config()
const config = require('./config')
const { clientToken, botChannel, clientId, guildId } = require('./config')
const { Client, Intents } = require('discord.js')
const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES)

const client = new Client({ intents: myIntents })

client.once('ready', () => {
  console.log('Ready!')
  // const channel = client.channels.cache.get(botChannel);
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// client.on('message', async message => {
// {
//   const input = message.content
//   if (input === "!ping")
//   {
//     await message.reply("Pong! :3")
//   }
//   else if (input === "!calendar")
//   {
//     notify.send( { embeds: [parseCalendar] })
//   }
// }
// })

client.login(clientToken).then(() => console.log(`Logged in as ${client.user.tag}!`))