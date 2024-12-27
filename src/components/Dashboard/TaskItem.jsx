import React from 'react';
import { useRouter } from 'next/router';

const TaskItem = ({ task, onDelete }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
    });
    onDelete(task.id);
  };

  const handleEdit = () => {
    router.push(`/edit?id=${task.id}`);
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <span>{task.name}</span>
      <div className="flex space-x-2">
        <button onClick={handleEdit} className="text-blue-500 hover:underline">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;