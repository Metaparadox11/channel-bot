module.exports = {
	name: 'addme',
	description: 'Adds command user to a private channel.',
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

        //get spoiler role permissions
        const spoilerPerms = role.permissions;

        //converts PermissionsBitField from role to the format neede for the next step
        //Code from Zsolt Meszaros here: https://stackoverflow.com/questions/75342954/giving-permissions-with-bitfield-number-discord-js
        const convertedPerms = Object.entries(PermissionsBitField.Flags).reduce((obj, [perm, value]) => ({ ...obj, [perm]: spoilerPerms.has(value) }), {});

        //This section prunes the full list of permissions to only those that are true (to avoid having the bot need Admin perms itself to set the falses)
        let usablePerms = {};

        Object.keys(convertedPerms).forEach(key => {
            if (convertedPerms[key]) {
                usablePerms[key] = convertedPerms[key];
            }
          });

        //ensures user has permission to view the channel
        usablePerms["ViewChannel"] = true;

        //add user to channel with spoiler role perms
        await channel.permissionOverwrites.edit(message.member, usablePerms);

        return message.reply('Added you to the channel: ' + args[0]);
	},
};