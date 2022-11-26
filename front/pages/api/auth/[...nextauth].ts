import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import { FormProvider } from "react-hook-form";
import { requestLogin } from "@services/api/user";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "email-password-credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: NextApiRequest) {
        const { access_token } = await requestLogin({ email: credentials?.email!, password: credentials?.password });
        if (access_token) {
          return credentials;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
