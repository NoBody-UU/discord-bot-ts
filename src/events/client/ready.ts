import Client from "../../classes/Client.js";



export default {
  name: "ready",
  once: true,
  execute(client: Client) {
    console.log(`[READY] ${client.user!.tag} is ready!`);
  }
}