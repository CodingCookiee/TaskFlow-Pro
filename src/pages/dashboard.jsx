import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TaskList from '../components/Dashboard/TaskList';
import TaskForm from '../components/Dashboard/TaskForm';
import { Card, CardHeader, CardContent } from "../components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/signin');
    },
  });
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }


  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name || 'User'}!</h1>
        <p className="text-gray-600">Manage your tasks efficiently</p>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="new">New Task</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <TaskList />
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Create New Task</h2>
            </CardHeader>
            <CardContent>
              <TaskForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
