import { useState } from 'react';
import { Card, CardContent, CardHeader, Button, Input } from '@/components/ui';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen bg-light-primary dark:bg-dark-primary"
    >
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-black-100 to-violet-300 dark:from-white-700 dark:to-white bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-sm text-black-500 dark:text-white-500 text-center">
            Enter your email to receive a reset link
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-light-accent hover:bg-violet-300/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 hover:text-white dark:text-black-200"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
