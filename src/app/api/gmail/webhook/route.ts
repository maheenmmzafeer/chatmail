import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Handle Pub/Sub push notifications here
  return NextResponse.json({ status: 'ok' });
}
