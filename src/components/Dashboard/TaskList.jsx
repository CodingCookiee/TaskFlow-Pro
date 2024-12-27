
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import { useSession } from 'next-auth/react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [session]);

  const handleDelete = async (id) => {
    if (!session) {
      return;
    }
    try {
      await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onDelete={handleDelete} 
          />
        ))
      )}
    </div>
  );
};

export default TaskList;