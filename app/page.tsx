'use client';

import { useState } from 'react';
import Link from 'next/link';

const mockPosts = [
  {
    id: 1,
    club: { name: 'Aarhus GF', logo: null, color: '#0d9488' },
    author: { name: 'Peter Hansen', avatar: null },
    type: 'highlight',
    content: 'Fantastisk mål af Mathilde i går aftes kamp! 🔥',
    media: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
    likes: 24,
    comments: 5,
    time: '2 timer siden',
  },
  {
    id: 2,
    club: { name: 'FC Midtjylland', logo: null, color: '#6366f1' },
    author: { name: 'Træner Jens', avatar: null },
    type: 'result',
    content: 'Kamp resultat: FC Midtjylland 3-2 Randers FC. God kamp gutter! 💪',
    media: null,
    likes: 18,
    comments: 2,
    time: '4 timer siden',
  },
  {
    id: 3,
    club: { name: 'Odense Håndbold', logo: null, color: '#f59e0b' },
    author: { name: 'Maria Lind', avatar: null },
    type: 'post',
    content: 'Tak for en fantastisk sæson til alle spillere og forældre! Vi ses til træning i morgen kl. 17:00 🏃‍♀️',
    media: null,
    likes: 32,
    comments: 8,
    time: '6 timer siden',
  },
];

const mockClubs = [
  { id: 1, name: 'Aarhus GF', followers: 1234, banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400', color: '#0d9488' },
  { id: 2, name: 'FC Midtjylland', followers: 2156, banner: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=400', color: '#6366f1' },
  { id: 3, name: 'Brøndby IF', followers: 3421, banner: 'https://images.unsplash.com/photo-1431324155629-1a371cafe2de?w=400', color: '#f59e0b' },
];

export default function FeedPage() {
  const [followingClubs, setFollowingClubs] = useState([1, 2]);

  return (
    <div className="space-y-4 p-4">
      {/* Search Bar */}
      <div className="search-bar sticky top-14 z-40 bg-[var(--background)] py-2">
        <span className="text-[var(--muted)]">🔍</span>
        <input type="text" placeholder="Søg efter klubber, hold eller spillere..." className="search-input" />
      </div>

      {/* Following Clubs */}
      <section>
        <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Klubber du følger</h2>
        <div className="flex gap-3 overflow-x-auto scroll-container pb-2">
          {mockClubs.filter(c => followingClubs.includes(c.id)).map(club => (
            <Link
              key={club.id}
              href={`/club/${club.id}`}
              className="flex-shrink-0 w-20"
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-2"
                style={{ background: club.color }}
              />
              <p className="text-xs text-center font-medium truncate">{club.name}</p>
            </Link>
          ))}
          <Link href="/search" className="flex-shrink-0 w-20">
            <div className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-dashed border-[var(--border)] flex items-center justify-center text-2xl">
              +
            </div>
            <p className="text-xs text-center text-[var(--muted)]">Følg</p>
          </Link>
        </div>
      </section>

      {/* Feed */}
      <section>
        <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Dit feed</h2>
        <div className="space-y-4">
          {mockPosts.map(post => (
            <article key={post.id} className="post-card">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full"
                  style={{ background: post.club.color }}
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{post.club.name}</p>
                  <p className="text-xs text-[var(--muted)]">{post.author.name} · {post.time}</p>
                </div>
                <button className="btn-ghost p-2 rounded-full">⋯</button>
              </div>

              <p className="mb-3">{post.content}</p>

              {post.media && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img src={post.media} alt="Post media" className="w-full aspect-video object-cover" />
                </div>
              )}

              <div className="flex items-center gap-6 pt-2 border-t border-[var(--border)]">
                <button className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--error)] transition">
                  <span>❤️</span>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition">
                  <span>💬</span>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--primary)] transition">
                  <span>📤</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Suggested Clubs */}
      <section className="pb-20">
        <h2 className="text-sm font-semibold text-[var(--muted)] mb-3">Opdag nye klubber</h2>
        <div className="grid grid-cols-2 gap-3">
          {mockClubs.filter(c => !followingClubs.includes(c.id)).map(club => (
            <Link
              key={club.id}
              href={`/club/${club.id}`}
              className="club-card"
            >
              <div 
                className="h-20 w-full"
                style={{ background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.5)), url(${club.banner})` }}
              />
              <div className="p-3">
                <p className="font-semibold">{club.name}</p>
                <p className="text-xs text-[var(--muted)]">{club.followers} følgere</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}