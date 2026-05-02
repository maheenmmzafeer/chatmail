import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFullThread } from '@/lib/gmail';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: any) {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const thread = await getFullThread(accessToken, context.params.id);
  return NextResponse.json({ thread });
}
