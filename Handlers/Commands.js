const { Permissions } = require('../Validation/Permissions.js');
const { Client } = require('discord.js')
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const { guildId } = require("../config");

/**
 *
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii('Loaded Commands');

    const commandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);
        const failure = 'FAILURE';
        const success = 'SUCCESS';

        if(!command.name) {
            const L = file.split('/');
            await Table.addRow(`${L[7] || failure}`, 'Command name is missing.');
        }

        if(!command.description) {
            await Table.addRow(`${command.name || failure}`, 'Command description is missing.');
        }

        if(!command.permission) {
            if(Permissions.includes(command.permission)) {
                command.defaultPermission = false;
            }
            else {
                await Table.addRow(`${command.name || failure}`, 'Command permission is missing.');
            }
        }

        if(command.once) {
            client.once(command.name, (...args) => command.execute(...args, client));
        }
        else {
            client.on(command.name, (...args) => command.execute(...args, client));
        }

        await client.commands.set(command.name, command);
        commandsArray.push(command);

        await Table.addRow(command.name, success);
    })

    console.log(Table.toString());

    // Permissions check

    client.on("ready", async () => {
        const guild = await client.guilds.cache.get(guildId);

        guild.commands.set(commandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = commandsArray.find((c) => c.name === commandName).permission;
                if(!cmdPerms) return null;

                return guild.roles.cache.filter((r) => r.permissions.has(cmdPerms));
            }

            const fullPermissions = command.reduce((accumulator, r) => {
                const roles = Roles(r.name);
                if(!roles) return accumulator;

                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);

                return [...accumulator, {id: r.id, permissions}]
            }, []);

            await guild.commands.permissions.set( { fullPermissions });
        });
    });
}