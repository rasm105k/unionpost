'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { id: 'home', icon: '🏠', label: 'Hjem', href: '/' },
  { id: 'search', icon: '🔍', label: 'Opdag', href: '/search' },
  { id: 'notifications', icon: '🔔', label: 'Notifikationer', href: '/notifications' },
  { id: 'profile', icon: '👤', label: 'Profil', href: '/profile' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="text-[var(--primary)]">Union</span>Post
          </Link>
          <Link href="/create" className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl">
            +
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-20 max-w-md mx-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-[var(--border)]">
        <div className="max-w-md mx-auto flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}