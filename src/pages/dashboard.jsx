import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TaskList from '../components/Dashboard/TaskList';
import TaskForm from '../components/Dashboard/TaskForm';
// Correct the import path for api
import { fetchTasks } from '../utils/api';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      const loadTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      };
      loadTasks();
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;