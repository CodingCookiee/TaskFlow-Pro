import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignIn from '@/components/Auth/SignIn';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-primary dark:bg-dark-primary">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-black-300 dark:border-white-700 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (status === 'authenticated') {
    return null;
  }

  return <SignIn />;
}
