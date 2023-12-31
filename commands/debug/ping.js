const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong Dev'),
    async execute(interaction) {
        const deleteButton = new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(deleteButton)

        const response = await interaction.reply({
            content: `Pong !`,
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
                content: 'Confirmation not received within 1 minute, cancelling', components: []
            });
            await wait(5000);
            await interaction.deleteReply();
        }
    }
};