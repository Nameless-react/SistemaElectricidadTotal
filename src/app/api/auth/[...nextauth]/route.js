import NextAuth from "next-auth";
import { options } from "./options";

// Pass the options to NextAuth
const handler = NextAuth(options);

export { handler as GET, handler as POST };
