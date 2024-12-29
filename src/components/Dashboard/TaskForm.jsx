import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input, Textarea } from '@/components/ui';
import { Calendar, Clock, Tag, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function TaskForm() {
  const router = useRouter();
  const [task, setTask] = useState({ 
    title: '', 
    description: '',
    dueDate: '',
    priority: 'low'
  });

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
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({...task, title: e.target.value})}
            className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
            required
          />
          <Tag className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
        </div>

        <div className="relative">
          <Textarea
            placeholder="Task Description"
            value={task.description}
            onChange={(e) => setTask({...task, description: e.target.value})}
            className="pl-10 w-full min-h-[120px] bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
            required
          />
          <AlertCircle className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input
              type="date"
              value={task.dueDate}
              onChange={(e) => setTask({...task, dueDate: e.target.value})}
              className="pl-10 w-full bg-black-100/5 dark:bg-white-500/5 border-0 focus:ring-2 ring-violet-300/20"
            />
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-black-500 dark:text-white-500" />
          </div>

          <div className="relative">
            <select
              value={task.priority}
              onChange={(e) => setTask({...task, priority: e.target.value})}
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

      <Button 
        type="submit"
        className="w-full bg-light-accent shadow-sm text-neutral-900 hover:bg-violet-300/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90 hover:text-white dark:text-black-200 rounded-xl py-3"
      >
        Create Task
      </Button>
    </motion.form>
  );
}
