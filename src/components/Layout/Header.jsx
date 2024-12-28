import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { LogOut, User, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black-300/10 bg-light-primary/80 dark:bg-dark-primary/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2 group" prefetch>
          <div className="font-bold text-3xl bg-gradient-to-r from-black-100 to-black-300 dark:from-white-700 dark:to-white group-hover:to-violet-300 bg-clip-text text-transparent transition-all duration-300">
            TaskFlow Pro
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {session ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="h-10 w-10 p-0 rounded-full bg-black-100/5 dark:bg-white-500/5 hover:bg-black-100/10 dark:hover:bg-white-500/10"
              >
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="  h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className=" ml-1 h-8 w-8 text-black-300 dark:text-white-700" />
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 py-2 bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl shadow-lg">
                  <div className="px-4 py-2 mb-2 border-b border-black-300/10 dark:border-white-500/10">
                    <p className="font-medium text-black-300 dark:text-white-700">
                      {session.user.name || session.user.email}
                    </p>
                    <p className="text-xs text-black-500 dark:text-white-500">
                      {session.user.email}
                    </p>
                  </div>
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)} prefetch>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/account/settings" onClick={() => setDropdownOpen(false)} prefetch>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      <Settings className="inline-block mr-2 h-4 w-4" />
                      Account Settings
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full text-left px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10"
                  >
                    <LogOut className="inline-block mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link href="/auth/signin" prefetch>
                <Button variant="ghost" 
                  className="text-black-300 dark:text-white-800 hover:bg-black-100/10 dark:hover:bg-white-500/10 
                  transition-all duration-300 rounded-xl px-6">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup" prefetch>
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-black-100/10 dark:hover:bg-white-500/10 rounded-xl transition-all duration-300"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-black-300 dark:text-white-700" />
          </button>

          {mobileMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 py-2 bg-light-primary dark:bg-dark-primary border border-black-300/10 rounded-xl shadow-lg">
              {session ? (
                <>
                  <div className="px-4 py-2 mb-2 border-b border-black-300/10 dark:border-white-500/10">
                    <p className="font-medium text-black-300 dark:text-white-700">
                      {session.user.name || session.user.email}
                    </p>
                    <p className="text-xs text-black-500 dark:text-white-500">
                      {session.user.email}
                    </p>
                  </div>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} prefetch>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/account/settings" onClick={() => setMobileMenuOpen(false)} prefetch>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      <Settings className="inline-block mr-2 h-4 w-4" />
                      Account Settings
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full text-left px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10"
                  >
                    <LogOut className="inline-block mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} prefetch>
                    <div className="px-4 py-2 text-black-300 dark:text-white-700 hover:bg-black-100/10 dark:hover:bg-white-500/10">
                      Sign In
                    </div>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} prefetch>
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