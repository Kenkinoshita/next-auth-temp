import type { NextAuthOptions, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
// eslint-disable-next-line import/no-named-as-default
import CredentialsProvider from 'next-auth/providers/credentials';

// ESLintルール 'eslint-disable-next-line import/no-named-as-default' を無視する理由
// 'next-auth/providers/credentials' はデフォルトエクスポートとして 'CredentialsProvider' を提供しています
// 今回は特殊ケースで、デフォルトエクスポートとして使用する必要があり、
// ESLintルールを無視することで、警告を回避して、`next-auth` の命名規約に準拠させます

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async () => {
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userName = user.userName;
        token.roleId = user.roleId;
        token.sessionKey = user.sessionKey;
        token.type = user.type;
        token.jti = user.jti;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        userName: token.userName,
        roleId: token.roleId,
        sessionKey: token.sessionKey,
        type: token.type,
      };
      session.sessionId = token.jti;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
