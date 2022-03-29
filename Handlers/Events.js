const { Events } = require("../Validation/EventNames.js");
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {
    const Table = new Ascii('Loaded Events');

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);
        const failure = 'FAILURE';
        const success = 'SUCCESS';

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split('/');
            await Table.addRow(`${event.name || failure}`, `Event name is either invalid or missing: ${L[6] + `/` + L[7]} `);
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }

        await Table.addRow(event.name, success);
    })

    console.log(Table.toString());
}