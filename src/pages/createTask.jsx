import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent } from '@/components/ui';
import TaskForm from '@/components/Dashboard/TaskForm';
import { Layout, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CreateTask() {
  const router = useRouter();
  

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-violet-300 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="mb-8 space-y-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-black-100/5 dark:bg-white-500/5 text-black-300 dark:text-white-700">
          <Sparkles className="h-4 w-4 mr-2" />
          New Creation
        </span>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-black-100 to-violet-300 dark:from-white-700 dark:to-white bg-clip-text text-transparent">
          Create New Task
        </h1>
        <p className="text-black-500 dark:text-white-500">
          Bring your ideas to life
        </p>
      </div>

      <Card className="bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <TaskForm onSuccess={() => router.push('/dashboard')} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
