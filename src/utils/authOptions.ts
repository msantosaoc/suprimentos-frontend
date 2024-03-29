import NextAuth, { getServerSession } from "next-auth/next";
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/services/api";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "E-mail" },
              password: { label: "Password", type: "password", placeholder: "Senha" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
              //   method: 'POST',
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify({
              //     username: credentials?.username,
              //     password: credentials?.password
              //   })
              // })
              const login = await api.post('/api/login', credentials).then(response=> {
                return response.data;
              })
              // const user = await res.json();
        
              if (login) {
                // Any object returned will be saved in `user` property of the JWT
                return login
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    pages: {
      signIn: '/',
      signOut: '/'
    },
    callbacks: {
      async jwt({ token, user}) {
        
        return({...token, ...user});
      },

      async session({session, token}) {
       session.user = token as any;
        return session ;
      }
    }
}
