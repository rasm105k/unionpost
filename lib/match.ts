import { supabase } from './supabase';

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

export async function createMatch(
  clubId: number,
  opponent: string,
  clubScore: number,
  opponentScore: number,
  playedAt: string
) {
  const { data, error } = await supabase
    .from('matches')
    .insert({
      club_id: clubId,
      opponent,
      club_score: clubScore,
      opponent_score: opponentScore,
      played_at: playedAt,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  await updateStandingsFromMatch(clubId);
  
  return { id: data.id };
}

export async function getMatches(clubId: number): Promise<Match[]> {
  const { data } = await supabase
    .from('matches')
    .select('*')
    .eq('club_id', clubId)
    .order('played_at', { ascending: false });
  return data || [];
}

export async function getStandings(clubId: number): Promise<Standings | null> {
  const { data } = await supabase
    .from('standings')
    .select('*')
    .eq('club_id', clubId)
    .single();
  return data;
}

export async function updateStandings(
  clubId: number,
  data: Partial<Standings>
) {
  const current = await getStandings(clubId);
  if (!current) return;
  
  await supabase
    .from('standings')
    .update({
      played: data.played ?? current.played,
      won: data.won ?? current.won,
      drawn: data.drawn ?? current.drawn,
      lost: data.lost ?? current.lost,
      goals_for: data.goals_for ?? current.goals_for,
      goals_against: data.goals_against ?? current.goals_against,
    })
    .eq('club_id', clubId);
}

async function updateStandingsFromMatch(clubId: number) {
  const matches = await getMatches(clubId);
  
  let played = 0, won = 0, drawn = 0, lost = 0, gf = 0, ga = 0;
  
  for (const m of matches) {
    played++;
    gf += m.club_score;
    ga += m.opponent_score;
    
    if (m.club_score > m.opponent_score) won++;
    else if (m.club_score < m.opponent_score) lost++;
    else drawn++;
  }
  
  await updateStandings(clubId, { played, won, drawn, lost, goals_for: gf, goals_against: ga });
}