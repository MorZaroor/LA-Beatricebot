const { Client } = require('discord.js');
const { Commands } = require('../../Handlers/Commands.js');
const { guildId } = require('../../config.js')


module.exports = {
    name: 'ready',
    once: true,
    /**
     *
     * @param {Client} client
     */
    execute(client) {
        console.log('Client is Ready!');
        setInterval(() => {
            const cet = new Date().toLocaleString('en-US', { timeZone: 'CET' });
            let cet_obj = new Date(cet);
            client.user.setActivity('In-game time ' + ('0' + cet_obj.getHours()).slice(-2) + ':' + ('0' + cet_obj.getMinutes()).slice(-2))
        }, 40000);

    }
}