const { Client, Intents } = require('discord.js');
const { token, channels } = require('./config.json');
const cron = require('node-cron');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
    console.log('Ready!');
    await sendMikuomoConoHa();
    cron.schedule(
        '0 */30 * * * *',
        async () => await sendMikuomoConoHa(),
        {
            timezone: "Asia/Tokyo"
        }
    );
});

client.login(token);

async function sendMikuomoConoHa () {
    try {
        let imgUrl = `https://conoha.mikumo.com/guideline/images/fanfic/fanfic_${Math.floor(Math.random() * 39) + 1}.png`;
        if (!imgUrl) return;
        for (const channelKey in channels) {
            let channel = client.channels.cache.get(channels[channelKey]);
            if (!channel || !channel.isText()) return;
            await channel.send({
                embeds: [
                    {
                        image: {
                            url: imgUrl
                        }
                    }
                ]
            })
        }
    } catch (err) {
        console.error(err);
    }
}