import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TaskItem from './TaskItem';
import { Card, CardContent } from '@/components/ui';
import { Loader2, Search, Filter } from "lucide-react";
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const { data: session } = useSession();

  useEffect(() => {
    fetchTasks();
  }, [session]);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchQuery, filter]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTasks = () => {
    let result = [...tasks];
  
    // Sort tasks by updatedAt date (most recent first)
    result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(task => 
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
  
    // Apply status filter
    switch (filter) {
      case 'active':
        result = result.filter(task => !task.completed);
        break;
      case 'completed':
        result = result.filter(task => task.completed);
        break;
      default:
        break;
    }
  
    setFilteredTasks(result);
  };
  
  

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, completed) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      });

      if (response.ok) {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, completed } : task
        ));
        toast.success('Task status updated');
      }
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-violet-300 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-black-500 dark:text-white-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black-100/5 dark:bg-white-500/5 rounded-xl border-0 focus:ring-2 ring-violet-300/20"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-black-100/5 dark:bg-white-500/5 rounded-xl border-0 focus:ring-2 ring-violet-300/20"
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-black-500 dark:text-white-500">
              {searchQuery ? 'No tasks found matching your search' : 'No tasks yet. Create your first task!'}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
