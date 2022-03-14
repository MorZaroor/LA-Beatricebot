const axios = require('axios')
const url = 'https://lostarkcodex.com/us/eventcalendar/'
const event_types = require('./event_types')
const { MessageEmbed } = require('discord.js')

const getHTML = async () =>
    await axios.get(url).then((response) => {
        console.log('Scraped HTML')
        return response
    }).catch((e) => {
        console.log('Failed to scrape HTML')
        return 'NO_EVENTS'
})

const parseCalendar = async (message) => {
    var date_ob = new Date()
    var day = ('0' + date_ob.getDate()).slice(-2)
    var month = date_ob.getMonth() + 1

    var response = await getHTML()
    var times = response.data.substring(response.data.lastIndexOf("var calendar_data=") + 18, response.data.lastIndexOf("var calendar_events=")).replace(';','')
    var parsed = JSON.parse(times)

    Object.keys(event_types.calendar_categories).forEach(async (category) => {
        var events = parsed[category][month][day]
        if (typeof events === 'undefined')
        {
            return
        }
        const categoryEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(event_types.calendar_categories[category])
        .setAuthor({ name: 'Beatrice the Seductress', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })
        .setThumbnail('https://lostarkcodex.com/images/icon_calendar_event_' + category + '.webp')
        .setImage('https://lostarkcodex.com/images/icon_calendar_event_' + category + '.webp')
        .setTimestamp()
        .setFooter({ text: 'peepeepoopoo', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })

        Object.keys(events).forEach((gearScore) => {
            Object.keys(events[gearScore]).forEach((eventID) => {
                console.log(categoryEmbed)
                if (typeof events[gearScore][eventID] !== 'undefined' && events[gearScore][eventID])
                {
                    let event_time = JSON.stringify(events[gearScore][eventID]).slice(1, -1).replace(/['"]+/g, '')
                    categoryEmbed.addField(event_types.calendar_events[eventID][0], event_time.replace(/\,/g,'\n'), false)
                }
            })
        })
        await message.guild.channels.cache.find(i => i.name === 'bot-test').send({ embeds: [categoryEmbed] })
    })

}

module.exports = { parseCalendar }