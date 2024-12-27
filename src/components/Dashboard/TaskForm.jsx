import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const { data: session } = useSession();
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName) {
      setError('Task name is required');
      return;
    }
    setError('');

    try {
      const response = await axios.post('/api/tasks/create', {
        name: taskName,
        userId: session.user.id,
      });
      onTaskAdded(response.data);
      setTaskName('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-4">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task"
        className="p-2 border rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;