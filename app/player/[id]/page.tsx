'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

const mockPlayer = {
  id: '1',
  name: 'Mathilde Jensen',
  number: 7,
  position: 'Midt',
  team: '1. Holds',
  club: 'Aarhus GF',
  bio: 'Elsker at spille bold! Træner 4 gange om ugen og har været med siden 2020.',
  stats: {
    season: '2025/2026',
    matches: 15,
    goals: 8,
    assists: 5,
    yellowCards: 2,
  },
  highlights: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
    'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=400',
  ],
};

export default async function PlayerPage({ params }: PageProps) {
  const { id } = await params;
  const player = mockPlayer;

  return (
    <div>
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]" />
        
        <Link href=".." className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
          ←
        </Link>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-12 relative">
        <div className="flex justify-between items-end">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-[var(--primary)] flex items-center justify-center text-4xl font-bold text-white">
            {player.number}
          </div>
          <button className="btn btn-secondary">Rediger</button>
        </div>

        <h1 className="text-2xl font-bold mt-3" style={{ fontFamily: 'var(--font-heading)' }}>{player.name}</h1>
        <p className="text-[var(--muted)]">{player.position} · {player.team}</p>
        
        <Link href={`/club/${player.club}`} className="badge badge-primary mt-2">
          {player.club}
        </Link>

        <p className="mt-4 text-sm">{player.bio}</p>

        {/* Season Stats */}
        <section className="mt-6">
          <h2 className="font-semibold mb-3">Sæson {player.stats.season}</h2>
          <div className="card p-4">
            <div className="stats-grid">
              <div>
                <div className="stats-number">{player.stats.matches}</div>
                <div className="stats-label">Kampe</div>
              </div>
              <div>
                <div className="stats-number text-[var(--success)]">{player.stats.goals}</div>
                <div className="stats-label">Mål</div>
              </div>
              <div>
                <div className="stats-number text-[var(--secondary)]">{player.stats.assists}</div>
                <div className="stats-label">Assists</div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-6 pb-20">
          <h2 className="font-semibold mb-3">Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {player.highlights.map((hl, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img src={hl} alt="Highlight" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}