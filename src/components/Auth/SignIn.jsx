import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { Chrome, ArrowRight, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        toast.error('Invalid credentials');
      } else {
        toast.success('Welcome back!');
        router.replace('/dashboard');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-light-primary dark:bg-dark-primary px-4"
    >
      <Card className="w-full max-w-md bg-white dark:bg-dark-primary border border-black-300/10 dark:border-white-500/10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-black-100 to-black-300 dark:from-white-700 dark:to-white bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-black-500 dark:text-white-500 mt-2">
              Continue your productivity journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-black-500 dark:text-white-500" />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-black-300/20 dark:ring-white-500/20"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-black-500 dark:text-white-500" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-black-300/20 dark:ring-white-500/20"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Link 
                  href="/auth/forgot-password"
                  className="text-sm text-black-300 dark:text-white-700 hover:text-violet-300 dark:hover:text-violet-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black-200 hover:bg-black-300 dark:bg-white text-white dark:text-black-200 
                dark:hover:bg-white-800 transition-all duration-300 rounded-xl py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center"
                >
                  <div className="h-5 w-5 border-2 border-white dark:border-black-200 border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </motion.div>
              ) : (
                <span className="flex items-center justify-center">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black-300/10 dark:border-white-500/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-primary text-black-500 dark:text-white-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full bg-black-100/5 dark:bg-white-500/5 hover:bg-black-100/10 dark:hover:bg-white-500/10 
              text-black-300 dark:text-white-700 transition-all duration-300 rounded-xl py-3"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Google
          </Button>

          <p className="mt-6 text-center text-sm text-black-500 dark:text-white-500">
            Don't have an account?{' '}
            <Link 
              href="/auth/signup" 
              className="font-medium text-black-300 dark:text-white-700 hover:text-violet-300 dark:hover:text-violet-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
