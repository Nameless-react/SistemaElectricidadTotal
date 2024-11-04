export default {
    dbStringConnection: process.env.DB_STRING,
    host: process.env.HOST || "localhost",
    resend: process.env.RESEND_API_KEY,
    appIdPusher: process.env.APP_ID,
    keyPusher: process.env.NEXT_PUBLIC_KEY,
    secretPusher: process.env.SECRET,
    clusterPusher: process.env.NEXT_PUBLIC_CLUSTER
}