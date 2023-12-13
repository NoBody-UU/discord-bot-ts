import { searchFilesRecursive } from "taskwizard";
import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import config from "#root/config.js";
import "dotenv/config";
import Command from "#types/commands.js";
import Events from "#types/events.js";

export default class BotClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public cooldowns: Collection<string, number> = new Collection();
  public config: typeof config = config;

  
  public constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.Message, Partials.Message],
      allowedMentions: { roles: [], users: [], repliedUser: true },
    });

  }


  public async loadEvents(dir: string) {
    const files = await searchFilesRecursive(dir);
    for (const file of files) {
      const event: Events<any> = (await import(`file://${file}`)).default;
      try {
        if (event.once) {
          this.once(event.name, (...args) => event.run(this, ...args));
        }
        else {
          this.on(event.name, (...args) => event.run(this, ...args));
        }
        console.log(`[EVENT] ${event.name} loaded`);
      } catch (e) {
        console.error(`[EVENT] ${event.name} failed to load`);
      }
      
    }
  }

  public async loadCommands(dir: string) {
    const files = await searchFilesRecursive(dir);
    for (const file of files) {
      const command: Command = (await import(`file://${file}`)).default;
      if (!command?.name) continue;
      try {
        this.commands.set(command.name, command);
        console.log(`[COMMAND] ${command.name} loaded`);
      } catch (e) {
        console.error(`[COMMAND] ${command.name} failed to load`, e);
      }
    }
  }

  public async start() {
    await Promise.all([
      this.loadCommands("./dist/commands"),
      this.loadEvents("./dist/events"),
    ]);
    
    await this.login(process.env.TOKEN);
  }
}