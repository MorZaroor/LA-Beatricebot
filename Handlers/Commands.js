// const { Perms } = require('../Validation/Permissions.js');
// const { promisify } = require('util');
// const { glob } = require('glob');
// const PG = promisify(glob);
// const Ascii = require('ascii-table');
//
//
// module.exports = async (client) => {
//     const Table = new Ascii('Loaded Commands');
//
//     const commandsArray = [];
//
//     (await PG(`${process.cwd()}/Commands/*/`).filter(file => file.endsWith('.js'))).map(async (file) => {
//         const command = require(file);
//         const failure = 'FAILURE';
//         const success = 'SUCCESS';
//
//         if(!command.name) {
//             const L = file.split('/');
//             await Table.addRow(`${L[7] || failure}`, 'Command name is missing.');
//         }
//
//         if(!command.description) {
//             await Table.addRow(`${command.name || failure}`, 'Command description is missing.');
//         }
//
//         if(!command.permission) {
//             if(Perms.includes(command.permission)) {
//                 command.defaultPermission = false;
//             }
//             else {
//                 await Table.addRow(`${command.name || failure}`, 'Command permission is missing.');
//             }
//         }
//
//         if(command.once) {
//             client.once(command.name, (...args) => command.execute(...args, client));
//         }
//         else {
//             client.on(command.name, (...args) => command.execute(...args, client));
//         }
//
//         await client.commands.set(command.name, command);
//         commandsArray.push(command);
//
//         await Table.addRow(command.name, success);
//     })
//
//     console.log(Table.toString());
// }