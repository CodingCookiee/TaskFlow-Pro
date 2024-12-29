import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardContent } from '@/components/ui';
import TaskForm from '@/components/Dashboard/TaskForm';

export default function CreateTask() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-black-300 dark:text-white-700">Create New Task</h1>
        </CardHeader>
        <CardContent>
          <TaskForm onSuccess={() => router.push('/dashboard')} />
        </CardContent>
      </Card>
    </div>
  );
}
