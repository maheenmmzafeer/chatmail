import { google } from "googleapis"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sendGmailMessage as sendGmailMessageHelper } from '@/lib/gmail';
import { NextResponse } from 'next/server';

export async function POST() {
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await startGmailWatch(accessToken);
  return NextResponse.json({ result });
}

async function startGmailWatch(accessToken: string) {
  const auth = new google.auth.OAuth2()

  auth.setCredentials({
    access_token: accessToken,
  })

  const gmail = google.gmail({ version: "v1", auth })

  const res = await gmail.users.watch({
    userId: "me",
    requestBody: {
      labelIds: ["INBOX"],
      topicName: process.env.GOOGLE_PUBSUB_TOPIC!,
    },
  })

  return res.data
}