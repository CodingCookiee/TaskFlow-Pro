import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    "Create and manage tasks efficiently",
    "Real-time updates and notifications",
    "Collaborative task management",
    "Mobile-responsive design",
    "Secure authentication"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Organize Your Tasks with Ease
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          A powerful task management solution for individuals and teams
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {!session ? (
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
