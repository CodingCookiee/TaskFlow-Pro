import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Layout/Header";
import { Inter } from '@next/font/google';
import Head from 'next/head';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>TaskFlow Pro</title>
        <meta name="description" content="Streamline your workflow with TaskFlow Pro" />
        <link rel="icon" href="/taskflow-icon.png" type="image/png" />
      </Head>
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

export default App;
