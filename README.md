# channel-bot

A bot created for the RPI/Troy LARPing Community Discord server to allow users to add themselves individually to private game spoiler channels. No databases necessary!

## Documentation

To set up the bot, invite it to your server (you'll need admin permissions to do this). (Also, I'm not posting the invite link publicly. If you want to use this bot on another server, email me at metaparadox11@gmail.com.)

Create a role named "Spoilers" (in those letters exactly) and give it all the text channel permissions you want users to have in the spoiler channels. Go into the private spoiler channels you want users to be able to add themselves to and add the Spoilers role to it as a role that can view it. You will need to add this role to each new spoiler channel you create.

You need to make sure it has access to all the channels you want it to be able to grant permissions for. This is easiest by giving it the "Spoilers" role.

After that, anyone in the server will be able to add themselves to any of these channels by name using this syntax:

~~~!addme name-of-text-channel-here