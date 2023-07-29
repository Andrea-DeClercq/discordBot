const { AttachmentBuilder, Client, Events, GatewayIntentBits } = require('discord.js');
const Canvas = require('@napi-rs/canvas');

async execute(interaction) {
    const response = await interaction.reply({
        content:'**Here get the ghost list availaible with the bot**\n\
        ```\n\
        Banshee         Demon           Deogen\n\
        Goryo           Hantu           Jinn\n\
        Mare            Moroi           Myling\n\
        Obake           Oni             Onryo\n\
        Phantom         Poltergeist     Raiju\n\
        Revenant        Shade           Spirit\n\
        Thaye           The Mimic       The Twins\n\
        Wraith          Yokai           Yurei\
        ```\
        ',
        components: [row]
    });
}
console.log('hello')