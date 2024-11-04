
import { getPusherInstance } from "/functions/others/pusher/pusherServer";

const pusherServer = getPusherInstance();

export const POST = async (req, params) => {
  console.log("authenticating pusher perms...")
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);


  const authResponse = pusherServer.authorizeChannel(socketId, channelName);
  return new Response(JSON.stringify(authResponse));
}