import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.set('club_session', '', { expires: new Date(0), path: '/' });
  return response;
}