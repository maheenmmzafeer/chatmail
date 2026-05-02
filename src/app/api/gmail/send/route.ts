import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { to, subject, body, threadId } = await req.json();
  const { sendGmailMessage } = await import('@/lib/gmail');
  const result = await sendGmailMessage(accessToken, { to, subject, body, threadId });
  return NextResponse.json({ result });
}