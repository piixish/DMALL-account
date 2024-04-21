const axios = require('axios');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({ checkUpdate: false });

const token = require('./config.json').token;
const messageDM = require('./config.json').msg;

client.on('ready', async (client) => {
    const allamis = (await axios({ url: `https://discordapp.com/api/v9/users/@me/relationships`, method: "GET", headers: { authorization: token } })).data;
    const r = allamis.filter((user) => { return user.type == 1 })
    let compteur = 1
    console.log("DM ALL DÉMARRÉ")
    for (i = 0; i < r.length; i++) {
        const friendToDM = await client.users.fetch(r[i].user.id);
        await friendToDM.send(messageDM.replaceAll(`{user}`, friendToDM))
            .then(() => {
                console.log(`${r[i].user.username} : DM RÉUSSI | ${compteur}`);
                compteur += 1;
            }).catch(() => {
                console.log(`${r[i].user.username} : DM ÉCHOUÉ`)
            })
        await setTimeout(async function () {
        }, 700)
    }
    console.log("DM TERMINÉ")
}).login(token);

process.on('multipleResolves', (type, pomise, value) => { return })
process.on('rejectionHandled', (pomise) => { return })
process.on('uncaughtException', (error, origin) => { console.log(error); console.log(origin) })
process.on('unhandledRejection', (reason, promise) => { console.log(reason); console.log(promise) })
process.on('uncaughtExceptionMonitor', (error, origin) => { return })