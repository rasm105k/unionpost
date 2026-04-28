'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockNotifications = [
  { id: 1, type: 'like', user: { name: 'Anna Petersen', avatar: null }, content: 'likede dit opslag', time: '5 min siden', read: false },
  { id: 2, type: 'comment', user: { name: 'Jens Hansen', avatar: null }, content: 'kommenterede: Fantastisk kamp!', time: '1 time siden', read: false },
  { id: 3, type: 'follow', user: { name: 'Maria Lind', avatar: null }, content: 'begyndte at følge Aarhus GF', time: '2 timer siden', read: true },
  { id: 4, type: 'match', user: { name: 'FC Midtjylland', avatar: null }, content: 'Kamp mod Randers FC starter om 30 minutter', time: '3 timer siden', read: true },
  { id: 5, type: 'like', user: { name: 'Peter Hansen', avatar: null }, content: 'likede din highlight', time: 'Igår', read: true },
];

export default function NotificationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'likes' | 'comments' | 'follows'>('all');

  const filters = [
    { id: 'all', label: 'Alle' },
    { id: 'likes', label: 'ikes' },
    { id: 'comments', label: 'Kommentarer' },
    { id: 'follows', label: 'Følger' },
  ];

  const filteredNotifications = mockNotifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'likes') return n.type === 'like';
    if (filter === 'comments') return n.type === 'comment';
    if (filter === 'follows') return n.type === 'follow';
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border)]">
        <div className="max-w-md mx-auto px-4 py-3">
          <h1 className="text-lg font-semibold">Notifikationer</h1>
        </div>
      </header>

      <main className="pt-16">
        {/* Filter Tabs */}
        <div className="border-b border-[var(--border)] px-4">
          <div className="flex gap-4 overflow-x-auto scroll-container">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  filter === f.id 
                    ? 'border-[var(--primary)] text-[var(--primary)]' 
                    : 'border-transparent text-[var(--muted)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-[var(--border)]">
          {filteredNotifications.map(notif => (
            <Link
              key={notif.id}
              href="/"
              className={`flex items-start gap-3 p-4 hover:bg-[var(--muted-light)] transition ${
                !notif.read ? 'bg-blue-50' : ''
              }`}
            >
              {/* Icon based on type */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {notif.type === 'like' && '❤️'}
                {notif.type === 'comment' && '💬'}
                {notif.type === 'follow' && '👤'}
                {notif.type === 'match' && '⚽'}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{notif.user.name}</span>{' '}
                  {notif.content}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">{notif.time}</p>
              </div>

              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-[var(--primary)] flex-shrink-0 mt-2" />
              )}
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-4xl mb-4">🔔</span>
            <p className="text-[var(--muted)]">Ingen notifikationer endnu</p>
          </div>
        )}
      </main>
    </div>
  );
}