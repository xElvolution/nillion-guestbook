'use client';
import { useEffect, useState } from 'react';

function getInitials(name: string) {
  return name?.slice(0, 2).toUpperCase();
}

function getColor(name: string) {
  // Simple hash to generate consistent background color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 60%, 50%)`;
  return color;
}

type GuestbookEntry = {
    name: string;
    memo: string;
  };  

export default function GuestbookEntries({ refresh }: { refresh: boolean }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      const res = await fetch('/api/entries');
      const data = await res.json();
      setEntries(data.data || []);
      setLoading(false);
    };

    fetchEntries();
  }, [refresh]);

  if (loading) return <p className="text-center">Loading entries...</p>;

  return (
    <div className="space-y-4 mt-8">
      {entries.map((entry, i) => (
        <div
          key={i}
          className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-md flex items-center gap-4 animate-fade-in"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: getColor(entry.name) }}
          >
            {getInitials(entry.name)}
          </div>
          <div className="flex-1">
            <strong className="text-purple-400">{entry.name}</strong>:{" "}
            <span className="ml-1">{withRandomEmoji(entry.memo)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function withRandomEmoji(text: string) {
  const emojis = ['🌟', '💜', '✨', '🎉', '🔥', '🥳', '📜', '🖊️', '💬', '🌈'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${text} ${emoji}`;
}
