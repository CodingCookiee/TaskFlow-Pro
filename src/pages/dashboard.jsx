import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { Plus } from 'lucide-react';
import TaskList from '@/components/Dashboard/TaskList';

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCreateTask = () => {
    router.push('/createTask');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <Button 
            onClick={handleCreateTask}
            className="bg-violet-300 hover:bg-violet-400 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </TabsList>
        <TabsContent value="tasks">
          <TaskList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
