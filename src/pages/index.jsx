import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    "Lightning-fast task management",
    "Real-time updates and notifications",
    "Collaborative workspace",
    "Mobile-responsive design",
    "Enterprise-grade security"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="max-w-3xl px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          TaskFlow Pro
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Elevate your productivity with our powerful task management solution
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-indigo-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {!session ? (
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
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
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Go to Dashboard
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
