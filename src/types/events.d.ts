import BotClient from "#root/classes/Client.ts";
import { Awaitable, ClientEvents } from "discord.js";

export default interface Events<T extends keyof ClientEvents> {
  name: T;
  once?: boolean;

  run: (client: BotClient, ...args: ClientEvents[T]) =>Awaitable<any>;
}


