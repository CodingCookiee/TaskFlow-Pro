import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";
import { LogOut, User, Plus, List, Menu, CheckCircle } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-indigo-600" />
          <div className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            TaskFlow Pro
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  My Tasks
                </Button>
              </Link>
              <Link href="/dashboard?tab=new">
                <Button variant="ghost" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="flex-col items-start p-2">
                    <div className="font-medium">{session.user.email}</div>
                    <div className="text-xs text-gray-500">Manage your account</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="text-red-600 p-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {session ? (
                <>
                  <DropdownMenuItem className="p-2">
                    <Link href="/dashboard" className="flex items-center w-full">
                      <List className="mr-2 h-4 w-4" />
                      My Tasks
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2">
                    <Link href="/dashboard?tab=new" className="flex items-center w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      New Task
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className="text-red-600 p-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="p-2">
                    <Link href="/auth/signin" className="w-full">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-2">
                    <Link href="/auth/signup" className="w-full">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
