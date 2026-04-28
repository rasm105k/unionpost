'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockSearchResults = {
  clubs: [
    { id: 1, name: 'Aarhus GF', followers: 1234, color: '#0d9488' },
    { id: 2, name: 'FC Midtjylland', followers: 2156, color: '#6366f1' },
    { id: 3, name: 'Brøndby IF', followers: 3421, color: '#f59e0b' },
    { id: 4, name: 'FC København', followers: 4521, color: '#ef4444' },
  ],
  teams: [
    { id: 1, name: '1. Holds', club: 'Aarhus GF', members: 12 },
    { id: 2, name: 'U19', club: 'FC Midtjylland', members: 15 },
  ],
  players: [
    { id: 1, name: 'Mathilde Jensen', team: '1. Holds', club: 'Aarhus GF', number: 7 },
    { id: 2, name: 'Anna Petersen', team: '2. Holds', club: 'Aarhus GF', number: 9 },
  ],
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'clubs' | 'teams' | 'players'>('all');

  const tabs = [
    { id: 'all', label: 'Alle' },
    { id: 'clubs', label: 'Klubber' },
    { id: 'teams', label: 'Hold' },
    { id: 'players', label: 'Spillere' },
  ];

  const hasResults = query.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border)]">
        <div className="p-4">
          <div className="search-bar">
            <span className="text-[var(--muted)]">🔍</span>
            <input
              type="text"
              placeholder="Søg efter klubber, hold eller spillere..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-[var(--muted)]">
                ✕
              </button>
            )}
          </div>
        </div>
        
        {hasResults && (
          <div className="flex gap-4 px-4 pb-3 overflow-x-auto scroll-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--muted-light)] text-[var(--foreground)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-28 p-4 space-y-6">
        {hasResults ? (
          <>
            {/* Clubs */}
            {(activeTab === 'all' || activeTab === 'clubs') && (
              <section>
                <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Klubber</h2>
                <div className="space-y-3">
                  {mockSearchResults.clubs.map(club => (
                    <Link key={club.id} href={`/club/${club.id}`} className="flex items-center gap-3 p-3 card">
                      <div className="w-12 h-12 rounded-full" style={{ background: club.color }} />
                      <div className="flex-1">
                        <p className="font-semibold">{club.name}</p>
                        <p className="text-xs text-[var(--muted)]">{club.followers} følgere</p>
                      </div>
                      <button className="btn-secondary px-4 py-2 text-sm">Følg</button>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Teams */}
            {(activeTab === 'all' || activeTab === 'teams') && (
              <section>
                <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Hold</h2>
                <div className="space-y-3">
                  {mockSearchResults.teams.map(team => (
                    <Link key={team.id} href={`/team/${team.id}`} className="flex items-center gap-3 p-3 card">
                      <div className="w-12 h-12 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white">
                        👥
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-xs text-[var(--muted)]">{team.club} · {team.members} spillere</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Players */}
            {(activeTab === 'all' || activeTab === 'players') && (
              <section>
                <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Spillere</h2>
                <div className="space-y-3">
                  {mockSearchResults.players.map(player => (
                    <Link key={player.id} href={`/player/${player.id}`} className="flex items-center gap-3 p-3 card">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-xs text-[var(--muted)]">{player.team} · {player.club}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {/* Featured Clubs */}
            <section>
              <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Populære klubber</h2>
              <div className="grid grid-cols-2 gap-3">
                {mockSearchResults.clubs.map(club => (
                  <Link key={club.id} href={`/club/${club.id}`} className="club-card">
                    <div className="h-20 w-full" style={{ background: club.color }} />
                    <div className="p-3">
                      <p className="font-semibold">{club.name}</p>
                      <p className="text-xs text-[var(--muted)]">{club.followers} følgere</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Browse by Sport */}
            <section>
              <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Browse efter sport</h2>
              <div className="grid grid-cols-3 gap-2">
                {['⚽ Fodbold', '🏸 Håndbold', '🏀 Basket', '🏐 Volleyball', '🧘 Gymnastik', '🏃 Atletik'].map(sport => (
                  <Link key={sport} href="/search" className="card p-3 text-center">
                    <p className="text-sm">{sport}</p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}