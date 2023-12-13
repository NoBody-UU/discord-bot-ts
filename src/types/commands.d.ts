import { PermissionResolvable, Message, ChatInputCommandInteraction, AutocompleteInteraction, Awaitable, ApplicationCommandOptionData } from "discord.js";
import Client from "../classes/Client.js";

export default interface Command {
  developerOnly?: boolean;
  name: string;
  aliases?: string[];
  description: string;
  cooldown?: number;
  userPermissions?: PermissionResolvable[];
  botPermissions?: PermissionResolvable[];
  options?: ApplicationCommandOptionData[];

  autoComplete?: (client: Client, interaction: AutocompleteInteraction) => Awaitable<any>;

  messageRun?:(client: Client, message: Message, args: string[]) => Awaitable<any>;
  
  interactionRun?: (client: Client, interaction: ChatInputCommandInteraction) => Awaitable<any>
}

