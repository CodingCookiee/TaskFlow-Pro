import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdownMenu";
import { LogOut, User, Plus, List, Menu } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            TaskFlow Pro
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">
                  <List className="mr-2 h-4 w-4" />
                  My Tasks
                </Button>
              </Link>
              <Link href="/dashboard?tab=new">
                <Button variant="ghost">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                    <User className="h-5 w-5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <div className="px-2 py-1.5">
                    <p className="font-medium">{session.user.email}</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
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
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </nav>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 hover:bg-gray-100 rounded-md">
                <Menu className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {session ? (
                <>
                  <Link href="/dashboard">
                    <DropdownMenuItem>
                      <List className="mr-2 h-4 w-4" />
                      My Tasks
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard?tab=new">
                    <DropdownMenuItem>
                      <Plus className="mr-2 h-4 w-4" />
                      New Task
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <DropdownMenuItem>Sign In</DropdownMenuItem>
                  </Link>
                  <Link href="/auth/signup">
                    <DropdownMenuItem>Sign Up</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
