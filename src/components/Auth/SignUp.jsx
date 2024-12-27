import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/routes/signup', {
      method: 'POST', // Ensure the method is POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      await signIn('credentials', { email, password });
      router.push('/dashboard');
    } else {
      try {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      } catch (err) {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/auth/signin" className="text-blue-500">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;