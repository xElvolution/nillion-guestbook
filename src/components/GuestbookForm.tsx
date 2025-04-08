'use client';
import { useState } from 'react';

export default function GuestbookForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify({ name, memo }),
      headers: { 'Content-Type': 'application/json' }
    });

    setLoading(false);
    if (res.ok) {
      setName('');
      setMemo('');
      onSuccess();
    } else {
      alert('❌ Failed to submit entry.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500"
        placeholder="Leave a memo..."
        value={memo}
        onChange={e => setMemo(e.target.value)}
        required
      />
      <button className="w-full py-2 bg-purple-600 rounded-xl font-semibold transition hover:bg-white hover:text-purple-600" disabled={loading}>
        {loading ? 'Submitting...' : 'Sign Guestbook'}
      </button>
    </form>
  );
}
