import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, Checkbox } from '@/components/ui';
import { Pencil, Trash2, Calendar, AlertCircle, MoreVertical } from "lucide-react";
import { motion } from 'framer-motion';

export default function TaskItem({ task, onDelete, onStatusChange }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
    setDropdownOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`group hover:shadow-md transition-all duration-200 ${
        task.completed ? 'bg-black-100/5 dark:bg-white-500/5' : 'bg-light-primary dark:bg-dark-primary'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <Checkbox
                checked={task.completed}
                onChange={(e) => onStatusChange(task.id, e.target.checked)}
                className="mt-1.5"
              />
              <div className="space-y-1 flex-1">
                <h3 className={`font-medium text-black-300 dark:text-white-700 ${
                  task.completed ? 'line-through text-black-500 dark:text-white-500' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-black-500 dark:text-white-500 line-clamp-2">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-xs text-black-500 dark:text-white-500">
                  {task.dueDate && (
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                  {task.priority && (
                    <span className="flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 hover:bg-black-100/10 dark:hover:bg-white-500/10 rounded-xl transition-all duration-300"
              >
                <MoreVertical className="h-5 w-5 text-black-300 dark:text-white-700" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl shadow-lg">
                  <button
                    onClick={() => {
                      router.push(`/edit?id=${task.id}`);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10 flex items-center"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-black-100/10 dark:hover:bg-white-500/10 flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
