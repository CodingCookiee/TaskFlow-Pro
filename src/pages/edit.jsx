import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Button, Input, Card, CardContent, Textarea } from '@/components/ui';
import { Loader2, ArrowLeft, Tag, AlertCircle, Calendar, Clock } from "lucide-react";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function EditTask() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin');
    },
  });

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = router.query;

  useEffect(() => {
    if (id && session) {
      fetchTask();
    }
  }, [id, session]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      toast.error('Failed to fetch task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        toast.success('Task updated successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
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
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-6 text-black-500 dark:text-white-500 hover:bg-black-100/5 dark:hover:bg-white-500/5"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <Card className="bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Input
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  placeholder="Task Title"
                  className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
                  required
                />
                <Tag className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
              </div>

              <div className="relative">
                <Textarea
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                  placeholder="Task Description"
                  className="pl-10 w-full min-h-[120px] bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
                />
                <AlertCircle className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
                  />
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
                </div>

                <div className="relative">
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20 rounded-lg h-11"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                className="flex-1 bg-light-accent text-neutral-900 hover:bg-violet-300/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 hover:text-white dark:text-black-200"
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 border-black-300/10 text-black-500 dark:text-white-500 hover:bg-black-100/5 dark:hover:bg-white-500/5"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
