'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      router.push('/login');
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard</h1>
      <p>Hello, {user.displayName}!</p>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
      >
        Sign Out
      </button>
    </div>
  );
}