import { createClub } from './lib/club';
import { createMatch } from './lib/match';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const testClubs = [
  { name: 'Manchester United', email: 'manutd@test.com', password: 'test123', banner: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800' },
  { name: 'Liverpool FC', email: 'liverpool@test.com', password: 'test123', banner: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800' },
  { name: 'Arsenal FC', email: 'arsenal@test.com', password: 'test123', banner: 'https://images.unsplash.com/photo-1431324155629-1a371cafe2de?w=800' },
];

for (const club of testClubs) {
  try {
    const c = createClub(club.name, club.email, hashPassword(club.password), club.banner);
    console.log(`Created club: ${c.name} (id: ${c.id})`);
    
    const matches = [
      { opponent: 'Chelsea', clubScore: 2, opponentScore: 1, date: '2026-04-20' },
      { opponent: 'Tottenham', clubScore: 1, opponentScore: 1, date: '2026-04-15' },
      { opponent: 'Newcastle', clubScore: 3, opponentScore: 0, date: '2026-04-10' },
      { opponent: 'West Ham', clubScore: 0, opponentScore: 2, date: '2026-04-05' },
    ];
    
    for (const m of matches) {
      createMatch(Number(c.id), m.opponent, m.clubScore, m.opponentScore, m.date);
      console.log(`  Added: ${c.name} ${m.clubScore}-${m.opponentScore} ${m.opponent}`);
    }
  } catch (e: any) {
    if (e.message?.includes('UNIQUE constraint')) {
      console.log(`Skipped ${club.name} - already exists`);
    } else {
      throw e;
    }
  }
}

console.log('Done!');