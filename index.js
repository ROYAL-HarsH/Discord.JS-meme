const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { loadCommands } = require('./utils/loadCommands');

client.login(process.env.TOKEN);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.on('message', message => {
    if (message.author.bot) return;

    const messageArray = message.content.split(/\s+/); // This regex splits on every whitespace
    const cmd = messageArray[0];
    const args = messageArray.slice(1);
    
    const prefix = "~";

    if (!message.content.startsWith(prefix)) return;
    
    const commandfile = client.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
    commandfile.run(client, message, args);
});
