module.exports = {
	name: 'dropme',
	description: 'Removes command user from a private channel.',
    args: false,
    guildOnly: true,
    cooldown: 0,
    async execute(client, message, args) {
        const { PermissionsBitField } = require('discord.js');
        const channels = message.guild.channels.cache;
        const role = message.guild.roles.cache.find(role => role.name === "Spoilers");

        //checks if there is a "Spoilers" role in the server
        if (!role) {
            return message.reply('There is no "Spoilers" role in this server.');
        }

        const spoilersChannels = channels.filter(channel => {
            const rolePermissions = channel.permissionsFor(role);
            if (!rolePermissions) {
                return false;
            }
            if (!rolePermissions.has(PermissionsBitField.Flags.ViewChannel)) {
                return false;
            }
            return true;
        });
        //TODO: Stuff into an embed
        let messageBody = 'List of channels:'; 
        spoilersChannels.each(channel => messageBody += `\n${channel}`)
        return message.reply(messageBody);
    }
}