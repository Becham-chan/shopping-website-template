import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/users";
import bcrypt from "bcryptjs"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
          username: {
            name: 'email',
            type: 'email',
            placeholder: 'email'
          },
        },
        async authorize(credentials, req) {

            const {email, password} = credentials

            try{
                await connectMongoDB();
                const user = await User.findOne({email: email})

                if (user === null){
                    throw Error("User with such email is not found");
                }
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch){
                    throw Error("Password doesn't match with credentials");
                }

                return user;
            }
            catch(error){
                console.log("Error :", error.message)
            }
        },
    })
  ],
  callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    items: token.items,
                    role: token.role,
                }
            }
        },
        jwt: ({ user, token }) => {
            if (user) {
              token.role = user.role
                return token
            }
            return token
        }
    },
  session: {
    jwt: true,
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  
  }
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};