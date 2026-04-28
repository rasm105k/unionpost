'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

const mockClub = {
  id: '1',
  name: 'Aarhus GF',
  color: '#0d9488',
  banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
  description: 'Aarhus Gymnastikforening - for alle aldre og niveauer. Vi træner mandag og torsdag kl. 17-19 i Ceres Arena.',
  followers: 1234,
  following: true,
  posts: [
    { id: 1, content: 'Fantastisk mål af Mathilde! 🔥', likes: 24, comments: 5, time: '2 timer siden' },
    { id: 2, content: 'Sæsonstart er lige om hjørnet! Mød op til træning i morgen kl. 17:00', likes: 18, comments: 2, time: '1 dag siden' },
  ],
  upcoming: [
    { id: 1, title: 'Træning', time: 'I morgen kl. 17:00', location: 'Ceres Arena' },
    { id: 2, title: 'Kamp mod Randers', time: 'Lørdag kl. 14:00', location: 'Randers Haller' },
  ],
};

const mockTeams = [
  { id: 1, name: '1. holds', age: 'Senior', members: 12 },
  { id: 2, name: '2. holds', age: 'Senior', members: 10 },
  { id: 3, name: 'Unge 1', age: 'U18', members: 15 },
  { id: 4, name: 'Unge 2', age: 'U16', members: 14 },
];

export default async function ClubPage({ params }: PageProps) {
  const { id } = await params;
  const club = mockClub;

  return (
    <div>
      {/* Banner */}
      <div className="relative h-48">
        <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Link href="/" className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm">
          ←
        </Link>
      </div>

      {/* Club Info */}
      <div className="px-4 -mt-12 relative">
        <div className="flex justify-between items-end">
          <div 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            style={{ background: club.color }}
          />
          <button className={`btn ${club.following ? 'btn-secondary' : 'btn-primary'}`}>
            {club.following ? 'Følger' : 'Følg'}
          </button>
        </div>

        <h1 className="text-2xl font-bold mt-3" style={{ fontFamily: 'var(--font-heading)' }}>{club.name}</h1>
        <p className="text-sm text-[var(--muted)]">{club.followers} følgere</p>
        
        <p className="mt-3 text-sm">{club.description}</p>

        {/* Upcoming Activities */}
        <section className="mt-4">
          <h2 className="font-semibold mb-2">Kommende aktiviteter</h2>
          <div className="space-y-2">
            {club.upcoming.map(activity => (
              <div key={activity.id} className="card p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
                  📅
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-[var(--muted)]">{activity.time} · {activity.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teams */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Hold</h2>
            <Link href={`/club/${id}/teams`} className="text-sm text-[var(--primary)]">Se alle</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockTeams.slice(0, 4).map(team => (
              <Link
                key={team.id}
                href={`/team/${team.id}`}
                className="card p-3"
              >
                <p className="font-semibold">{team.name}</p>
                <p className="text-xs text-[var(--muted)]">{team.age} · {team.members} spillere</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mt-6 pb-20">
          <h2 className="font-semibold mb-2">Seneste opslag</h2>
          <div className="space-y-3">
            {club.posts.map(post => (
              <article key={post.id} className="card p-4">
                <p>{post.content}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-[var(--muted)]">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span className="ml-auto">{post.time}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}