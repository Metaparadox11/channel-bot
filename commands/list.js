module.exports = {
	name: 'dropme',
	description: 'Removes command user from a private channel.',
    args: false,
    guildOnly: true,
    cooldown: 0,
    async execute(client, message, args) {
        const { PermissionsBitField, ChannelType } = require('discord.js');
        //channel cache is a collection type
        const channels = message.guild.channels.cache;
        const role = message.guild.roles.cache.find(role => role.name === "Spoilers");
        //checks if there is a "Spoilers" role in the server
        if (!role) {
            return message.reply('There is no "Spoilers" role in this server.');
        }
        const categories = channels.filter(channel => channel.type === ChannelType.GuildCategory);
        let mapOfSpoilerCategories = new Map();

        for (const category of categories){
            let spoilersInCategory = category.children.cache.filter(
                channel => {
                    const rolePermissions = channel.permissionsFor(role);
                    if (!rolePermissions) {
                        return false;
                    }
                    if (!rolePermissions.has(PermissionsBitField.Flags.ViewChannel)) {
                        return false;
                    }
                    return true;
            });
            //for each category, add sorted spoiler channels of that category to the list to print
            if (spoilersInCategory.size > 0) mapOfSpoilerCategories.set(
                category.name, 
                spoilersInCategory.cache.sort(a,b => {return a.localeCompare(b)})
                )
        };

        // const spoilersChannels = channels.filter(channel => {
        //     const rolePermissions = channel.permissionsFor(role);
        //     if (!rolePermissions) {
        //         return false;
        //     }
        //     if (!rolePermissions.has(PermissionsBitField.Flags.ViewChannel)) {
        //         return false;
        //     }
        //     return true;
        // });
        //TODO: Stuff into an embed, probably find a cleaner method of stitching this together
        // Character limits??

        
        let messageBody = 'List of channels:'; 
        mapOfSpoilerCategories.forEach((value, key)=>{
            messageBody += `\n**${key}**\n`;
            messageBody += value.values().join('\n');
            messageBody += `\n`;
        })
        spoilersChannels.each(channel => messageBody += `\n${channel}`);
        return message.reply(messageBody);
    }
}