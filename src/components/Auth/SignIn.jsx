import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect to dashboard or handle successful sign-in
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-xs">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Sign In
        </button>
      </form>
      <button
        onClick={() => signIn('google')}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;