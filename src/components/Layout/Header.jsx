import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { LogOut, User, Plus, List, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black-300/10 bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="font-bold text-3xl bg-gradient-to-r from-black-100 to-black-300 dark:from-white-700 dark:to-white group-hover:to-violet-300 bg-clip-text text-transparent transition-all duration-300">
            TaskFlow Pro
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" 
                  className="text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10 
                  transition-all duration-300 rounded-xl px-5">
                  <List className="mr-2 h-4 w-4" />
                  My Tasks
                </Button>
              </Link>
              <Link href="/dashboard?tab=new">
                <Button variant="ghost" 
                  className="text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10 
                  transition-all duration-300 rounded-xl px-5">
                  <Plus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-black-100/5 dark:bg-white-500/5 
                    hover:bg-black-100/10 dark:hover:bg-white-500/10 transition-all duration-300">
                    <User className="h-5 w-5 text-black-300 dark:text-white-700" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-light-primary/95 dark:bg-dark-primary/95 backdrop-blur-lg border-black-300/10">
                  <div className="px-3 py-2">
                    <p className="font-medium text-black-300 dark:text-white-700">{session.user.email}</p>
                    <p className="text-xs text-black-500 dark:text-white-500">Manage your account</p>
                  </div>
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })} 
                    className="text-black-300 dark:text-white-600 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" 
                  className="text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10 
                  transition-all duration-300 rounded-xl px-6">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-black-200 hover:bg-black-300 dark:bg-white text-white dark:text-black-200 
                  dark:hover:bg-white-800 transition-all duration-300 rounded-xl px-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </nav>

        <div className="block md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-black-100/10 dark:hover:bg-white-500/10 rounded-xl transition-all duration-300"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-black-300 dark:text-white-700" />
          </button>

          {isOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl shadow-lg">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10 flex items-center">
                      <List className="mr-2 h-4 w-4" />
                      My Tasks
                    </div>
                  </Link>
                  <Link href="/dashboard?tab=new" onClick={() => setIsOpen(false)}>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10 flex items-center">
                      <Plus className="mr-2 h-4 w-4" />
                      New Task
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full text-left px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      Sign In
                    </div>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      Sign Up
                    </div>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
