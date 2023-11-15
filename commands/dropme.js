module.exports = {
	name: 'dropme',
	description: 'Removes command user from a private channel.',
    args: true,
    usage: '<channel name>',
    guildOnly: true,
    cooldown: 0,
    async execute(client, message, args) {
        const { PermissionsBitField } = require('discord.js');

        //checks if channel name in args is valid
        if (!message.guild.channels.cache.find(channel => channel.name === args[0])) {
            return message.reply('You need to include a valid channel name.');
        }

        const channel = message.guild.channels.cache.find(channel => channel.name === args[0]);
        const role = message.guild.roles.cache.find(role => role.name === "Spoilers");

        //checks if there is a "Spoilers" role in the server
        if (!role) {
            return message.reply('There is no "Spoilers" role in this server.');
        }

        const rolePermissions = channel.permissionsFor(role);

        //checks if the Spoilers role permissions are null
        if (!rolePermissions) {
            return message.reply('Error finding spoiler role permissions.');
        }

        //checks if the Spoilers role has permissions in the channel from args
        if (!rolePermissions.has(PermissionsBitField.Flags.ViewChannel)) {
            return message.reply('You need to specify a spoiler channel.');
        }
        await channel.permissionOverwrites.delete(message.member);
    }
}