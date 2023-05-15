import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../../global";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials) {
                if (credentials && credentials.usuario) {
                    return JSON.parse(credentials.usuario)
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        async session({ token }) {
            const axios = await api();
            const resposta = await axios.post("/validar-token-usuario", token.user)
                .then(res => res.data) /* A reposta vem true/ false */
                .catch(() => false) /* Se de algum erro retornar false */

            if (resposta) {
                return { ...token.user }
            } else {
                return false
            }
        },
        async signIn(user, account, profile) {
            const { email } = user
            try {
                return true
            } catch (error) {
                console.log("DEU ERRO: " + error)
                return false
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
export default (req, res) => NextAuth(req, res, authOptions)
