'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

const mockTeam = {
  id: '1',
  name: '1. Holds',
  age: 'Senior',
  trainer: 'Jens Hansen',
  trainerPhone: '+45 12 34 56 78',
  members: 12,
  stats: {
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    goalsFor: 28,
    goalsAgainst: 12,
  },
};

const mockPlayers = [
  { id: 1, name: 'Mathilde Jensen', number: 7, position: 'Midt', goals: 8, assists: 5, image: null },
  { id: 2, name: 'Anna Petersen', number: 9, position: 'Angrib', goals: 12, assists: 3, image: null },
  { id: 3, name: 'Sofie Andersen', number: 4, position: 'Forsvar', goals: 1, assists: 2, image: null },
  { id: 4, name: 'Karina Nielsen', number: 1, position: 'Mål', goals: 0, assists: 0, image: null },
  { id: 5, name: 'Lise Hansen', number: 11, position: 'Midt', goals: 5, assists: 7, image: null },
  { id: 6, name: 'Mette Kristensen', number: 6, position: 'Midt', goals: 2, assists: 4, image: null },
];

const mockResults = [
  { id: 1, opponent: 'Randers FC', us: 3, them: 1, date: '12. jan', win: true },
  { id: 2, opponent: 'FC København', us: 2, them: 2, date: '5. jan', win: false },
  { id: 3, opponent: 'Odense Håndbold', us: 4, them: 1, date: '29. dec', win: true },
];

export default async function TeamPage({ params }: PageProps) {
  const { id } = await params;
  const team = mockTeam;

  return (
    <div>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white p-6">
        <Link href=".." className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-sm">
          ←
        </Link>
        
        <div className="pt-8">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{team.name}</h1>
          <p className="text-white/80">{team.age}</p>
        </div>
      </div>

      {/* Stats */}
      <section className="p-4">
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Sæsonstatistik</h2>
          <div className="stats-grid">
            <div>
              <div className="stats-number">{team.stats.played}</div>
              <div className="stats-label">Kampe</div>
            </div>
            <div>
              <div className="stats-number text-[var(--success)]">{team.stats.won}</div>
              <div className="stats-label">Vundet</div>
            </div>
            <div>
              <div className="stats-number">{team.stats.drawn}</div>
              <div className="stats-label">Uafgjort</div>
            </div>
          </div>
          <div className="divider" />
          <div className="flex justify-around text-center">
            <div>
              <div className="font-bold text-lg">+{team.stats.goalsFor}</div>
              <div className="text-xs text-[var(--muted)]">Mål for</div>
            </div>
            <div>
              <div className="font-bold text-lg">-{team.stats.goalsAgainst}</div>
              <div className="text-xs text-[var(--muted)]">Mål imod</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer */}
      <section className="px-4">
        <div className="card p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--secondary)] flex items-center justify-center text-3xl">
            👨‍🏫
          </div>
          <div className="flex-1">
            <p className="font-semibold">Træner</p>
            <p className="text-sm">{team.trainer}</p>
            <p className="text-sm text-[var(--muted)]">{team.trainerPhone}</p>
          </div>
          <button className="btn-secondary p-3 rounded-full">📞</button>
        </div>
      </section>

      {/* Recent Results */}
      <section className="p-4">
        <h2 className="font-semibold mb-3">Seneste resultater</h2>
        <div className="space-y-2">
          {mockResults.map(result => (
            <div key={result.id} className="card p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{result.opponent}</p>
                <p className="text-xs text-[var(--muted)]">{result.date}</p>
              </div>
              <div className={`text-xl font-bold ${result.win ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}>
                {result.us} - {result.them}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Players */}
      <section className="px-4 pb-20">
        <h2 className="font-semibold mb-3">Spillere ({team.members})</h2>
        <div className="space-y-2">
          {mockPlayers.map(player => (
            <Link key={player.id} href={`/player/${player.id}`} className="player-card">
              <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                {player.number}
              </div>
              <div className="flex-1">
                <p className="font-medium">{player.name}</p>
                <p className="text-xs text-[var(--muted)]">{player.position}</p>
              </div>
              <div className="text-right text-sm">
                <p>{player.goals} mål</p>
                <p className="text-[var(--muted)]">{player.assists} assists</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}