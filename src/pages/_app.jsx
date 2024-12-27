import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Layout/Header";
import { Inter } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Component {...pageProps} />
        </main>
        <Toaster position="bottom-right" />
      </div>
    </SessionProvider>
  );
}
