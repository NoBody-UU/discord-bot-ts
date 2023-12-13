import Command from "#types/commands.js";


 const comamnd: Command = {
  name: "ping",
  description: "Mi fabulosísimo comando en ts",
  userPermissions: ["SendMessages", "ModerateMembers"],

  async interactionRun(client, interaction) {
    await interaction.reply("Pong!");
  },
  
  messageRun(client, message, args) {
    message.reply("Pong!");
  },
};


export default comamnd;