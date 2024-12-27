import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                <Link href="/">Todo App</Link>
            </h1>
            <nav>
                <ul className="flex space-x-4">
                    {session ? (
                        <>
                            <li>
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <button onClick={() => signOut()} className="text-gray-300 hover:text-white">
                                    Sign Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/auth/signin">Sign In</Link>
                            </li>
                            <li>
                                <Link href="/auth/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;