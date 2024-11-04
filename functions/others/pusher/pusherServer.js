import config from "/config/config"
import PusherServer from "pusher" 


let pusherInstance = null;

export const getPusherInstance = () => {
    if (!pusherInstance) {
        pusherInstance = new PusherServer({
            appId: config.appIdPusher,
            key: config.keyPusher,
            secret: config.secretPusher,
            cluster: config.clusterPusher,
            useTLS: true,
          })
    }
    return pusherInstance
}