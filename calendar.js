const axios = require('axios')
const url = 'https://lostarkcodex.com/us/eventcalendar/'
const event_types = require('./event_types')


const getHTML = async (url) =>
    await axios.get(url).then((response) => {
        console.log('Scraped HTML')
        return response
    }).catch((e) => {
        console.log('Failed to scrape HTML')
        return 'NO_EVENTS'
    })

const parseCalendar = async (event_types) => {
    var date_ob = new Date()
    var day = date_ob.getDate()
    var month = date_ob.getMonth() + 1

    var response = getHTML(url)
    var times = response.data.substring(response.data.lastIndexOf("var calendar_data=") + 18, response.data.lastIndexOf("var calendar_events=")).replace(';','')
    var parsed = JSON.parse(times)

    
    
    




}

const postCalendar = async (event_types) => {
    var

    
    




}
