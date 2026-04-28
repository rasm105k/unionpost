import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClub, getClubBySlug, updateBannerImage } from '@/lib/club';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  console.log('Signup called');
  console.log('Env check:', {
    URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'set' : 'MISSING',
    KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'set' : 'MISSING'
  });
  
  try {
    const body = await request.json();
    console.log('Request body:', { name: body.name, email: body.email });
    
    const { name, email, password, bannerImage } = body;
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const hashedPassword = hashPassword(password);
    console.log('Password hashed, length:', hashedPassword.length);
    
    const club = await createClub(name, email, hashedPassword, bannerImage);
    console.log('Club created:', club.id);
    
    const response = NextResponse.json({ success: true, club });
    response.cookies.set('club_session', club.id.toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });
    
    return response;
  } catch (err: any) {
    console.error('Signup error:', err);
    console.error('Error message:', err.message);
    console.error('Error code:', err.code);
    if (err.message?.includes('duplicate') || err.code === '23505') {
      return NextResponse.json({ error: 'Email or club name already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 });
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