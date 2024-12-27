import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FcGoogle } from 'react-icons/fc';

export default function AuthForm({ mode = 'signin' }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    });
    
    if (!result.error) {
      window.location.href = '/dashboard';
    }
  };

  return (
    <Card className="w-[400px] shadow-xl">
      <CardHeader className="text-2xl font-bold text-center">
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => signIn('google')}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
