const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('info')
	.setDescription('Get info about a user or a server!')
	.addSubcommand(subcommand =>
		subcommand
			.setName('user')
			.setDescription('Info about a user')
			.addUserOption(option => option.setName('target').setDescription('The user')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('server')
			.setDescription('Info about the server')),
    async execute(interaction) {
        
        const deleteButton = new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(deleteButton)

        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                const response = await interaction.reply({
                    content: `Username: ${user.username}\nID: ${user.id}`,
                    components: [row]
                });
            } else {
                const response = await interaction.reply({
                    content: `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`,
                    components: [row]
                });
                }
            } else if (interaction.options.getSubcommand() === 'server') {
                const response = await interaction.reply({
                    content : `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
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
    }
};