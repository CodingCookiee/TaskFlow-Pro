import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import TaskList from '../components/Dashboard/TaskList';
import TaskForm from '../components/Dashboard/TaskForm';
import { fetchTasks } from '../utils/api';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <button onClick={handleLogout} className="mb-4 bg-red-500 text-white p-2 rounded">Logout</button>
      <TaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Dashboard;