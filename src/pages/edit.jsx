import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import prisma from '../utils/prisma';

const EditTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState({ name: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/');
        return;
      }

      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
      setLoading(false);
    };

    if (id) {
      fetchTask();
    }
  }, [id, router]);

  const handleChange = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await getSession();
    if (!session) {
      return;
    }
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    router.push('/dashboard');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Task</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={task.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;