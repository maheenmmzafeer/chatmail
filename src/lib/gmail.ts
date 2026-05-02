import { google } from "googleapis"

type GmailHeader = {
  name?: string | null
  value?: string | null
}

type ParsedContact = {
  name: string
  email: string
}

type GmailProfile = {
  emailAddress?: string
}

export type ThreadSummary = {
  id: string
  subject: string
  snippet: string
  lastMessageTime: string
  unread: boolean
  messageCount: number
  contactName: string
  contactEmail: string
  participantEmails: string[]
}

export type ThreadMessage = {
  id: string
  from: string
  to: string
  subject: string
  body: string
  timestamp: string
}

// Gmail client
export function getGmailClient(accessToken: string) {
  const auth = new google.auth.OAuth2()

  auth.setCredentials({
    access_token: accessToken,
  })

  return google.gmail({ version: "v1", auth })
}

// Decode email body safely
function decodeBody(data: string) {
  if (!data) return ""

  const normalized = data.replace(/-/g, "+").replace(/_/g, "/")
  return Buffer.from(normalized, "base64").toString("utf-8")
}

function getHeader(headers: GmailHeader[], name: string) {
  const normalizedName = name.toLowerCase()
  return headers.find((h) => h.name?.toLowerCase() === normalizedName)?.value || ""
}

function parseContact(raw: string): ParsedContact {
  const fallback = "unknown@example.com"
  if (!raw) return { name: "Unknown", email: fallback }

  const bracketMatch = raw.match(/(.*)<([^>]+)>/)
  if (bracketMatch) {
    const name = bracketMatch[1]?.trim().replace(/^"|"$/g, "") || bracketMatch[2].trim()
    return { name, email: bracketMatch[2].trim().toLowerCase() }
  }

  const emailMatch = raw.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  if (emailMatch) {
    return { name: raw.replace(emailMatch[0], "").trim() || emailMatch[0], email: emailMatch[0].toLowerCase() }
  }

  return { name: raw, email: fallback }
}

function extractBestBody(payload: any): string {
  if (!payload) return ""

  if (payload.body?.data) {
    return decodeBody(payload.body.data)
  }

  const parts: any[] = payload.parts || []
  if (!parts.length) return ""

  const plainTextPart = parts.find((part) => part.mimeType === "text/plain" && part.body?.data)
  if (plainTextPart) {
    return decodeBody(plainTextPart.body.data)
  }

  const htmlPart = parts.find((part) => part.mimeType === "text/html" && part.body?.data)
  if (htmlPart) {
    return decodeBody(htmlPart.body.data)
  }

  for (const part of parts) {
    const nested = extractBestBody(part)
    if (nested) return nested
  }

  return ""
}

async function getCurrentUserEmail(gmail: ReturnType<typeof getGmailClient>) {
  try {
    const profile = await gmail.users.getProfile({ userId: "me" })
    return profile.data.emailAddress?.toLowerCase() || ""
  } catch {
    return ""
  }
}

// Format ONE message
export function formatMessage(msg: any) {
  const headers: GmailHeader[] = msg.payload?.headers || []

  const formatted: ThreadMessage = {
    id: msg.id,
    from: getHeader(headers, "From"),
    to: getHeader(headers, "To"),
    subject: getHeader(headers, "Subject"),
    body: extractBestBody(msg.payload),
    timestamp: msg.internalDate || "",
  }

  return formatted
}

// Format full thread
export function formatThread(thread: any) {
  const messages = thread.messages || []
  return messages.map(formatMessage)
}

function formatThreadSummary(thread: any, currentUserEmail: string): ThreadSummary | null {
  const messages = thread.messages || []
  if (!messages.length) return null

  const lastMessage = messages[messages.length - 1]
  const headers: GmailHeader[] = lastMessage.payload?.headers || []
  const fromRaw = getHeader(headers, "From")
  const subject = getHeader(headers, "Subject") || "(No subject)"
  const from = parseContact(fromRaw)

  const participantEmails = new Set<string>()
  for (const message of messages) {
    const messageHeaders: GmailHeader[] = message.payload?.headers || []
    const msgFrom = parseContact(getHeader(messageHeaders, "From")).email
    const msgTo = parseContact(getHeader(messageHeaders, "To")).email
    if (msgFrom && msgFrom !== "unknown@example.com") participantEmails.add(msgFrom)
    if (msgTo && msgTo !== "unknown@example.com") participantEmails.add(msgTo)
  }

  const hasUnreadMessage = messages.some((message: any) => (message.labelIds || []).includes("UNREAD"))
  const otherParticipants = Array.from(participantEmails).filter((email) => email && email !== currentUserEmail)
  const contactEmail = otherParticipants[0] || from.email || "unknown@example.com"

  const contactName =
    parseContact(fromRaw).email === currentUserEmail
      ? parseContact(getHeader(headers, "To")).name || contactEmail
      : parseContact(fromRaw).name || contactEmail

  return {
    id: thread.id,
    subject,
    snippet: thread.snippet || "",
    lastMessageTime: lastMessage.internalDate || "",
    unread: hasUnreadMessage,
    messageCount: messages.length,
    contactName,
    contactEmail,
    participantEmails: Array.from(participantEmails),
  }
}

// Get threads
export async function getGmailThreads(accessToken: string) {
  const gmail = getGmailClient(accessToken)
  const currentUserEmail = await getCurrentUserEmail(gmail)

  const res = await gmail.users.threads.list({
    userId: "me",
    maxResults: 20,
  })

  const baseThreads = res.data.threads || []
  if (!baseThreads.length) return []

  const detailedThreads = await Promise.allSettled(
    baseThreads.map((thread) =>
      gmail.users.threads.get({
        userId: "me",
        id: thread.id!,
        format: "metadata",
        metadataHeaders: ["From", "To", "Subject", "Date"],
      }),
    ),
  )

  const summaries: ThreadSummary[] = []
  for (const result of detailedThreads) {
    if (result.status !== "fulfilled") continue
    const summary = formatThreadSummary(result.value.data, currentUserEmail)
    if (summary) summaries.push(summary)
  }

  summaries.sort((a, b) => Number(b.lastMessageTime || 0) - Number(a.lastMessageTime || 0))
  return summaries
}

// Get full thread messages
export async function getFullThread(accessToken: string, threadId: string) {
  const gmail = getGmailClient(accessToken)

  const res = await gmail.users.threads.get({
    userId: "me",
    id: threadId,
  })

  return formatThread(res.data)
}

// Send email
export async function sendGmailMessage(
  accessToken: string,
  { to, subject, body, threadId }: { to: string; subject: string; body: string; threadId?: string }
) {
  const gmail = getGmailClient(accessToken)

  const email = [
    `To: ${to}`,
    "Content-Type: text/plain; charset=utf-8",
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n")

  const encoded = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encoded,
      threadId,
    },
  })

  return res.data
}

// Start Gmail watch
export async function startGmailWatch(accessToken: string) {
  const gmail = getGmailClient(accessToken)

  const res = await gmail.users.watch({
    userId: "me",
    requestBody: {
      labelIds: ["INBOX"],
      topicName: process.env.GOOGLE_PUBSUB_TOPIC!,
    },
  })

  return res.data
}