import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Textarea, Card, CardContent } from '@/components/ui';
import { toast } from 'react-hot-toast';

export default function TaskForm() {
  const [task, setTask] = useState({ title: '', description: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      
      if (response.ok) {
        toast.success('Task created successfully');
        setTask({ title: '', description: '' });
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({...task, title: e.target.value})}
            className="w-full"
            required
          />
          <Textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({...task, description: e.target.value})}
            className="w-full min-h-[100px]"
            required
          />
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
