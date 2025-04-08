'use client';
import GuestbookForm from '@/components/GuestbookForm';
import GuestbookEntries from '@/components/GuestbookEntries';
import { useState } from 'react';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-purple-400 font-bold text-3xl mb-6 text-center">📝 Elvolution Guestbook</h1>
      
      <div className="w-full max-w-xl">
        <GuestbookForm onSuccess={() => setRefresh(!refresh)} />
        <GuestbookEntries refresh={refresh} />
      </div>
    </main>
  );
}
