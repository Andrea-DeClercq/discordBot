const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs')
const path = require('node:path')

dotenv.config()

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const folderPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders){
    const commandsPath = path.join(folderPath, folder)
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
    for (const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is mission a required "data" or "execute" property.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);
    if(!command) {
        console.error(`No commande matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error){
        console.log(error);
        if( interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!', ephemeral: true
            })
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!', ephemeral: true
            })
        }
    }
})

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);