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
  setInterval(() => {
    var cet = new Date().toLocaleString("en-US", { timeZone: "CET" })
    let cet_obj = new Date(cet)
    client.user.setActivity("Ingame time " + ("0" + cet_obj.getHours()).slice(-2) + ":" + ("0" + cet_obj.getMinutes()).slice(-2))
  }, 40000)
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