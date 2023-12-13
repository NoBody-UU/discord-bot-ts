import Events from "#types/events.js";

const event: Events<"messageCreate"> = {
  name: "messageCreate",

  async run(client, message) {
    if (message.author.bot) return;
    const prefix = client.config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;
    const command = client.commands.get(commandName) ?? client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command?.messageRun) return;
    if (command.developerOnly && !client.config.owenrs.includes(message.author.id)) return;

    if (command.userPermissions?.length) {
      if (!message.member?.permissions.has(command.userPermissions)) return message.reply("No tienes permisos para ejecutar este comando");
    }
    if (command.botPermissions?.length) {
      if (!message.guild?.members.me?.permissions.has(command.botPermissions)) return message.reply("No tengo permisos para ejecutar este comando");
    }

    if (command.cooldown) {
      if (client.cooldowns.has(`${message.author.id}-${command.name}`)) return message.reply("Estás en cooldown");
      client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + command.cooldown * 1000);
      setTimeout(() => client.cooldowns.delete(`${message.author.id}-${command.name}`), command.cooldown * 1000);
    }

    try {
      await command.messageRun(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("Ha ocurrido un error al ejecutar este comando");
    }
  }
  
}

export default event;