import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClub, getClubBySlug, updateBannerImage } from '@/lib/club';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, bannerImage } = await request.json();
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const club = await createClub(name, email, hashPassword(password), bannerImage);
    
    const response = NextResponse.json({ success: true, club });
    response.cookies.set('club_session', club.id.toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    
    return response;
  } catch (err: any) {
    console.error('Signup error:', err);
    if (err.message?.includes('duplicate') || err.code === '23505') {
      return NextResponse.json({ error: 'Email or club name already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('club_session')?.value;
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const { bannerImage } = await request.json();
  await updateBannerImage(parseInt(sessionId), bannerImage);
  
  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }
  
  const club = await getClubBySlug(slug);
  if (!club) {
    return NextResponse.json({ error: 'Club not found' }, { status: 404 });
  }
  
  return NextResponse.json({ club });
}