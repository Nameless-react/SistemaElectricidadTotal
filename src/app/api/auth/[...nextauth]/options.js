import Credentials from "next-auth/providers/credentials";
import sequelze from "../../../../../config/databaseConnection";
import bcrypt from "bcrypt";

export const options = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Search for the user in the database
                const user = await sequelze.query(
                    "SELECT * FROM users WHERE email = :email",
                    {
                        replacements: { email },
                        type: sequelze.QueryTypes.SELECT,
                    }
                );

                // If the user is not found, return null
                if (!user || user.length === 0) {
                    return null;
                }

                const foundUser = user[0]; // The user found
                const hashedPassword = foundUser.password; // Hashed password stored in the database

                // Compare the passwords
                const isValidPassword = await bcrypt.compare(password, hashedPassword);

                // If the password is not valid, return null
                if (!isValidPassword) {
                    return null;
                }

                const roles = await sequelze.query(
                    "SELECT * FROM User_Roles_View WHERE id = :id",
                    {
                        replacements: { id: foundUser.id_users },
                        type: sequelze.QueryTypes.SELECT,
                    }
                );
                console.log(foundUser);
                // Extract only the name or id of the roles
                const userRoles = roles.map(role => role.rol);  // ['Administrador', 'Empleado', 'Usuario']

                // Return user object if authentication is successful
                return {
                    id: foundUser.id_users,
                    email: foundUser.email,
                    name: foundUser.name,
                    image: foundUser.image,
                    roles: userRoles,
                };
            },
        }),
    ],
    pages: {
        signIn: '/login', // Custom sign-in page
    },
    session: {
        strategy: "jwt",  // Enable JWT as the session strategy
    },
    callbacks: {
        // Control what is stored in the JWT
        async jwt({ token, user }) {
            // If user is authenticated, attach user info to the JWT token
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.roles = user.roles;
                token.name = user.name;
            }
            return token;
        },
        // Control what is returned in the session object
        async session({ session, token }) {
            // Attach JWT token data to the session
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.roles = token.roles;
            session.user.name = token.name;
            return session;
        },
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,  // Set the secret used to sign the JWT
        encryption: true,  // Enable JWT encryption
    },
};