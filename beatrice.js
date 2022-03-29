require('dotenv').config()
const { clientToken, botChannel, clientId, guildId } = require('./config')
const { parseCalendar, parseDailyCalendar } = require('./calendar')
const { Client, Intents } = require('discord.js')
const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS)

const client = new Client({ intents: myIntents })

client.on('interactionCreate', async interaction => {
  console.log("peepeepoopoo")
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!')
  }
})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  NOTIFY_CHANNEL = client.channels.fetch(botChannel)
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
  else if (input === "!dailycalendar")
  {
    await parseDailyCalendar(message)
  }
  else if (input === "!clear")
  {
    message.guild.channels.cache.find(i => i.name === 'bot-test').bulkDelete(100, true)
  }
}
})

client.login(clientToken).then(() => console.log(`Logged in as ${client.user.tag}!`))