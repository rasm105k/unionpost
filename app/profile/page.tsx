'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockProfile = {
  name: 'Marcus Hansen',
  email: 'marcus@example.com',
  avatar: null,
  clubs: [
    { id: 1, name: 'Aarhus GF', role: 'Spiller' },
  ],
  myPosts: [
    { id: 1, content: 'God træning i dag! 💪', likes: 12, comments: 3, time: '2 dage siden' },
  ],
  savedPosts: [
    { id: 1, content: 'Sæsonplan 2026', likes: 45, comments: 8, time: '1 uge siden' },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'settings'>('posts');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border)]">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-semibold">Profil</h1>
          <Link href="/settings" className="text-[var(--muted)]">⚙️</Link>
        </div>
      </header>

      <main className="pt-16">
        {/* Profile Header */}
        <div className="p-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center text-4xl font-bold text-white mx-auto">
            MH
          </div>
          <h1 className="text-xl font-bold mt-4" style={{ fontFamily: 'var(--font-heading)' }}>{mockProfile.name}</h1>
          <p className="text-sm text-[var(--muted)]">{mockProfile.email}</p>

          {/* My Clubs */}
          <div className="flex justify-center gap-2 mt-4">
            {mockProfile.clubs.map(club => (
              <Link key={club.id} href={`/club/${club.id}`} className="badge badge-primary">
                {club.name} · {club.role}
              </Link>
            ))}
            <button className="badge badge-secondary">+ Tilføj</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--border)] px-4">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 px-4 font-medium border-b-2 transition ${
                activeTab === 'posts'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted)]'
              }`}
            >
              Mine opslag
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-3 px-4 font-medium border-b-2 transition ${
                activeTab === 'saved'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted)]'
              }`}
            >
              Gemt
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-4 font-medium border-b-2 transition ${
                activeTab === 'settings'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted)]'
              }`}
            >
              Indstillinger
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {activeTab === 'posts' && (
            mockProfile.myPosts.map(post => (
              <article key={post.id} className="card p-4">
                <p>{post.content}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-[var(--muted)]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span className="ml-auto">{post.time}</span>
                </div>
              </article>
            ))
          )}

          {activeTab === 'saved' && (
            mockProfile.savedPosts.map(post => (
              <article key={post.id} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[var(--accent)]">🔖</span>
                  <span className="text-xs text-[var(--muted)]">Gemt</span>
                </div>
                <p>{post.content}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-[var(--muted)]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span className="ml-auto">{post.time}</span>
                </div>
              </article>
            ))
          )}

          {activeTab === 'settings' && (
            <div className="space-y-2">
              <Link href="/profile/edit" className="card p-4 flex items-center justify-between">
                <span>Rediger profil</span>
                <span className="text-[var(--muted)]">→</span>
              </Link>
              <Link href="/notifications" className="card p-4 flex items-center justify-between">
                <span>Notifikationer</span>
                <span className="text-[var(--muted)]">→</span>
              </Link>
              <Link href="/privacy" className="card p-4 flex items-center justify-between">
                <span>Privatlivspolitik</span>
                <span className="text-[var(--muted)]">→</span>
              </Link>
              <button className="card p-4 flex items-center justify-between w-full text-left text-[var(--error)]">
                <span>Log ud</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}