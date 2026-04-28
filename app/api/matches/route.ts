import { NextRequest, NextResponse } from 'next/server';
import { createMatch, getMatches, getStandings } from '@/lib/match';

export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';
  
  let clubId: number, opponent: string, clubScore: number, opponentScore: number, playedAt: string;
  
  if (contentType.includes('application/json')) {
    const body = await request.json();
    clubId = body.clubId;
    opponent = body.opponent;
    clubScore = body.clubScore;
    opponentScore = body.opponentScore;
    playedAt = body.playedAt;
  } else {
    const formData = await request.formData();
    clubId = parseInt(formData.get('clubId') as string);
    opponent = formData.get('opponent') as string;
    clubScore = parseInt(formData.get('clubScore') as string);
    opponentScore = parseInt(formData.get('opponentScore') as string);
    playedAt = formData.get('playedAt') as string;
  }
  
  if (!clubId || !opponent || clubScore === undefined || opponentScore === undefined || !playedAt) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  
  const match = createMatch(clubId, opponent, clubScore, opponentScore, playedAt);
  return NextResponse.json({ success: true, match });
}

export async function GET(request: NextRequest) {
  const clubId = request.nextUrl.searchParams.get('clubId');
  if (!clubId) {
    return NextResponse.json({ error: 'Missing clubId' }, { status: 400 });
  }
  
  const matches = getMatches(parseInt(clubId));
  const standings = getStandings(parseInt(clubId));
  
  return NextResponse.json({ matches, standings });
}