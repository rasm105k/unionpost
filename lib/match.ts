import { db } from './db';

export interface Match {
  id: number;
  club_id: number;
  opponent: string;
  club_score: number;
  opponent_score: number;
  played_at: string;
  created_at: string;
}

export interface Standings {
  id: number;
  club_id: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
}

export function createMatch(clubId: number, opponent: string, clubScore: number, opponentScore: number, playedAt: string) {
  const stmt = db.prepare(
    'INSERT INTO matches (club_id, opponent, club_score, opponent_score, played_at) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(clubId, opponent, clubScore, opponentScore, playedAt);
  
  updateStandingsFromMatch(clubId);
  
  return { id: result.lastInsertRowid };
}

export function getMatches(clubId: number): Match[] {
  return db.prepare(
    'SELECT * FROM matches WHERE club_id = ? ORDER BY played_at DESC'
  ).all(clubId) as Match[];
}

export function getStandings(clubId: number): Standings | undefined {
  return db.prepare('SELECT * FROM standings WHERE club_id = ?').get(clubId) as Standings | undefined;
}

export function updateStandings(clubId: number, data: Partial<Standings>) {
  const current = getStandings(clubId);
  if (!current) return;
  
  const stmt = db.prepare(`
    UPDATE standings 
    SET played = COALESCE(?, played),
        won = COALESCE(?, won),
        drawn = COALESCE(?, drawn),
        lost = COALESCE(?, lost),
        goals_for = COALESCE(?, goals_for),
        goals_against = COALESCE(?, goals_against)
    WHERE club_id = ?
  `);
  stmt.run(
    data.played ?? current.played,
    data.won ?? current.won,
    data.drawn ?? current.drawn,
    data.lost ?? current.lost,
    data.goals_for ?? current.goals_for,
    data.goals_against ?? current.goals_against,
    clubId
  );
}

function updateStandingsFromMatch(clubId: number) {
  const matches = getMatches(clubId);
  
  let played = 0, won = 0, drawn = 0, lost = 0, gf = 0, ga = 0;
  
  for (const m of matches) {
    played++;
    gf += m.club_score;
    ga += m.opponent_score;
    
    if (m.club_score > m.opponent_score) won++;
    else if (m.club_score < m.opponent_score) lost++;
    else drawn++;
  }
  
  updateStandings(clubId, { played, won, drawn, lost, goals_for: gf, goals_against: ga });
}