require('dotenv').config()
const config = require('./config')
const { Client, Intents } = require('discord.js')
const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES)

const client = new Client({ intents: myIntents })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  NOTIFY_CHANNEL = client.channels.fetch(config['Bot_Channel'])
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
    
  }
}
})

client.login(config['ClientToken'])