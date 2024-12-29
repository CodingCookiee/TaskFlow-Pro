import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Plus, Layout, Sparkles } from 'lucide-react';
import TaskList from '@/components/Dashboard/TaskList';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

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
          <Layout className="h-4 w-4 mr-2" />
          Dashboard
        </span>
        <h1 className=" text-4xl font-bold bg-gradient-to-r from-black-100 to-violet-300 dark:from-white-700 dark:to-white bg-clip-text text-transparent">
          Welcome back, {session?.user?.name || 'Creator'}
        </h1>
        <p className="text-black-500 dark:text-white-500 ">
          Let's organize your workflow
        </p>
      </div>

      <Tabs defaultValue="tasks" className="space-y-8">
        <div className="flex items-center gap-2.5">
          <TabsList className="bg-black-100/5 dark:bg-white-500/5 p-1 rounded-xl">
            <TabsTrigger 
              value="tasks"
              className="px-4 py-2 rounded-lg  text-black-300 dark:text-white-700 data-[state=active]:bg-light-primary dark:data-[state=active]:bg-dark-primary"
            >
              My Tasks
            </TabsTrigger>
          </TabsList>

          <Button 
          onClick={() => router.push('/createTask')}
          className="bg-black-100/5 text-neutral-800  hover:bg-violet-300/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 hover:text-white-800 dark:text-black-200 rounded-xl px-6 py-2  transition-all duration-300 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Task
        </Button>
        </div>

        <TabsContent value="tasks" className="mt-6 ">
          <div className="">
            <TaskList />
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
