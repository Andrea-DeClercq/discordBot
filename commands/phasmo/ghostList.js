const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ghostlist')
        .setDescription('Get the ghost list available with the bot'),
    async execute(interaction) {
        const deleteButton = new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(deleteButton)

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

        const collectFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({
                filter: collectFilter, time: 60000
            });

            if (confirmation.customId === 'delete'){
                await interaction.deleteReply();
            }

        } catch (e) {
            await interaction.editReply({
                content: 'Auto-deleting message...', components: []
            });
            await wait(5000);
            await interaction.deleteReply();
        }
    }
};