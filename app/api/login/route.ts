import { NextRequest, NextResponse } from 'next/server';
import { verifyClub } from '@/lib/club';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  
  const club = await verifyClub(email, hashPassword(password));
  
  if (!club) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  const response = NextResponse.json({ success: true, club: { id: club.id, name: club.name, slug: club.slug } });
  response.cookies.set('club_session', club.id.toString(), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
  
  return response;
}