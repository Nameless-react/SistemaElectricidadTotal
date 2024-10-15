import config from "/config/config"
import PusherClient from "pusher-js"

export default new PusherClient(config.keyPusher, {
  cluster: config.clusterPusher,
  authEndpoint: "/api/chat/pusher-auth"
})