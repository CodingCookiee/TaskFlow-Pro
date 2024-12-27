import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Todo App</h1>
      <p className="mb-8">Manage your tasks efficiently.</p>
      {!session ? (
        <div className="flex space-x-4">
          <Link href="/auth/signin">
            Sign In
          </Link>
          <Link href="/auth/signup">
            Sign Up
          </Link>
        </div>
      ) : (
        <Link href="/dashboard">
          Go to Dashboard
        </Link>
      )}
    </div>
  );
};

export default Home;