import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getGmailThreads } from '@/lib/gmail';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const threads = await getGmailThreads(accessToken);
  return NextResponse.json({ threads });
}