export default {
    dbStringConnection: process.env.DB_STRING,
    host: process.env.HOST || "localhost",
    resend: process.env.RESEND_API_KEY
}

