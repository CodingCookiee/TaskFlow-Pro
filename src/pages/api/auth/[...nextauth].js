import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prisma from '../../../utils/prisma';
import jwt from 'jsonwebtoken';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[a-z]/.test(password) && 
         /[0-9]/.test(password) &&
         /[!@#$%^&*(),.?":{}|<>]/.test(password); 
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        if (!validateEmail(credentials.email)) {
          throw new Error('Invalid email format');
        }

        if (!validatePassword(credentials.password)) {
          throw new Error('Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error('No user found with this email');
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return user;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email }
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                image: profile.picture
              }
            });
            return true;
          }
          
          await prisma.user.update({
            where: { email: profile.email },
            data: {
              name: profile.name,
              image: profile.picture
            }
          });
          return true;
        } catch (error) {
          console.error('SignIn Error:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true
          }
        });

        token.id = dbUser.id;
        token.accessToken = jwt.sign(
          { 
            userId: dbUser.id, 
            email: dbUser.email 
          },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: '24h' }
        );
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export default NextAuth(authOptions);
