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

    const calendarEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle("Events starting within the next hour")
    .setAuthor({ name: 'Beatrice the Seductress', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })
    .setThumbnail('https://lostarkcodex.com/images/icon_calendar_event_4.webp')
    .setImage('https://lostarkcodex.com/images/icon_calendar_event_4.webp')
    .setTimestamp()
    .setFooter({ text: 'peepeepoopoo', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })

    Object.keys(event_types.calendar_categories).forEach(async (category) => {
        var events = parsed[category][month][day]
        if (typeof events === 'undefined')
        {
            return
        }


        Object.keys(events).forEach((gearScore) => {
            Object.keys(events[gearScore]).forEach((eventID) => {
                console.log(calendarEmbed)
                if (typeof events[gearScore][eventID] !== 'undefined' && events[gearScore][eventID])
                {
                    Object.keys(events[gearScore][eventID]).forEach((event_time) => {
                        let event_hour = events[gearScore][eventID][event_time].split(':')[0]
                        let event_minute = events[gearScore][eventID][event_time].split(':')[1]
                        let event_hdiff = (event_hour - date_ob.getHours()) * 60
                        let event_mdiff = (event_minute - date_ob.getMinutes()) + event_hdiff
                        if (event_mdiff >= 0 && event_mdiff <= 60)
                        {
                            calendarEmbed.addField(event_types.calendar_events[eventID][0], events[gearScore][eventID][event_time].replace(/\,/g,'\n'), false)
                        }
                    })
                }
            })
        })
    })
    await message.guild.channels.cache.find(i => i.name === 'bot-test').send({ embeds: [calendarEmbed] })
}

const parseDailyCalendar = async (message) => {
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
        const calendarEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(event_types.calendar_categories[category])
        .setAuthor({ name: 'Beatrice the Seductress', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })
        .setThumbnail('https://lostarkcodex.com/images/icon_calendar_event_' + category + '.webp')
        .setImage('https://lostarkcodex.com/images/icon_calendar_event_' + category + '.webp')
        .setTimestamp()
        .setFooter({ text: 'peepeepoopoo', iconURL: 'https://cdn.discordapp.com/avatars/951237146386251886/6365bdb68ecf9847880ea6e20e6ba05c.webp' })

        Object.keys(events).forEach((gearScore) => {
            Object.keys(events[gearScore]).forEach((eventID) => {
                console.log(calendarEmbed)
                if (typeof events[gearScore][eventID] !== 'undefined' && events[gearScore][eventID])
                {
                    let event_time = JSON.stringify(events[gearScore][eventID]).slice(1, -1).replace(/['"]+/g, '')
                    calendarEmbed.addField(event_types.calendar_events[eventID][0], event_time.replace(/\,/g,'\n'), false)
                }
            })
        })
        await message.guild.channels.cache.find(i => i.name === 'bot-test').send({ embeds: [calendarEmbed] })
    })

}

module.exports = { parseCalendar }