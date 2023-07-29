const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const fs = require('node:fs')
const path = require('node:path')
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ghost')
        .setDescription('Get the ghost details')
        .addStringOption(option => 
                option.setName('entity')
                    .setDescription('Get the entity details')
                    .setRequired(true)
                    .addChoices(
                        { name: 'Banshee', value:'banshee' },
                        { name: 'Demon', value:'demon' },
                        { name: 'Deogen', value: 'deogen' },
                        { name: 'Goryo', value: 'goryo' },
                        { name: 'Hantu' , value: 'hantu' },
                        { name: 'Jinn', value: 'jinn' },
                        { name: 'Mare', value: 'mare' },
                        { name: 'Moroi', value: 'moroi' },
                        { name: 'Myling' , value: 'myling' },
                        { name: 'Obake', value: 'obake' },
                        { name: 'Oni', value: 'oni' },
                        { name: 'Onryo', value: 'onryo' },
                        { name: 'Phantom', value: 'phantom' },
                        { name: 'Poltergeist', value: 'poltergeist' },
                        { name: 'Raiju', value: 'raiju' },
                        { name: 'Revenant', value: 'revenant' },
                        { name: 'Shade', value: 'shade' },
                        { name: 'Spirit', value: 'spirit' },
                        { name: 'Thaye', value: 'thaye' },
                        { name: 'The Mimic', value: 'the_mimic' },
                        { name: 'The Twins', value: 'the_twins' },
                        { name: 'Wraith', value: 'wraith' },
                        { name: 'Yokai', value: 'yokai' },
                        { name: 'Yurei', value: 'yurei' },
                    )
            ),
    async execute(interaction) {
        const choice = interaction.options.getString('entity')

        const deleteButton = new ButtonBuilder()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(deleteButton)

        // const canvasPath = path.join(__dirname+'/../../', 'canvas');
        // const canvaGhost = fs.readdirSync(canvasPath).filter(file => file.startsWith(choice));
        // const filePath = path.join(canvasPath, canvaGhost[0])
        // const event = require(filePath)
        // console.log(canvaGhost[0]);
        const response = await interaction.reply({
            content: `${choice}`,
            components: [row]
        });

        const collectFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({
                filter: collectFilter, time: 10000
            });

            if (confirmation.customId === 'delete'){
                await interaction.deleteReply();
            }

        } catch (e) {
            await interaction.editReply({
                content: 'Auto-deletion reply...', components: []
            });
            await wait(5000);
            await interaction.deleteReply();
        }
    }
};