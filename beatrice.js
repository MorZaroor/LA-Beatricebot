require('dotenv').config()
const config = require('./config')
const { parseCalendar } = require('./calendar')
const { Client, Intents } = require('discord.js')
const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES)

const client = new Client({ intents: myIntents })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  NOTIFY_CHANNEL = client.channels.fetch(config['BotChannel'])
})

client.on('message', async message => {
{
  var input = message.content.toLowerCase().replace(/ +(?= )/g,'')
  if (input === "!ping")
  {
    message.reply("Pong! :3")
  }
  else if (input === "!calendar")
  {
    await parseCalendar(message)
  }
  else if (input === "!clear")
  {
    message.guild.channels.cache.find(i => i.name === 'bot-test').bulkDelete(100, true)
  }
}
})

client.login(config['ClientToken'])