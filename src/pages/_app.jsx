import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>TaskFlow Pro</title>
        <meta name="description" content="Streamline your workflow with TaskFlow Pro" />
        <link rel="icon" href="/task.png" type="image/png" />
      </Head>
      <div className={`min-h-screen flex flex-col bg-light-primary dark:bg-dark-primary ${inter.className}`}>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </SessionProvider>
  );
}

export default App;
