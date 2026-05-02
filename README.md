# ChatMail - Gmail with WhatsApp Interface

A modern web application that connects to your Gmail account and displays emails in a beautiful, WhatsApp-style chat interface. Instead of traditional email inbox layout, your email threads appear as chat conversations with message bubbles.

## ✨ Features

- **WhatsApp-Style Interface**: Email threads displayed as chat conversations with message bubbles
- **Google OAuth Login**: Seamless sign-in with your Google account
- **Real-time Updates**: Server-Sent Events (SSE) for instant new message notifications
- **Three-Panel Layout**: Contacts sidebar, conversations center, and chat view
- **Dark Theme**: Modern, eye-friendly dark interface inspired by WhatsApp
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Search**: Find contacts and conversations quickly

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirect to /login or /mail
│   ├── login/               # Google OAuth login page
│   ├── mail/                # Main app (three-panel layout)
│   └── api/
│       ├── auth/            # NextAuth.js configuration
│       └── gmail/           # Gmail API endpoints
├── components/
│   ├── chat-view.tsx        # Email thread viewer
│   ├── chat-bubble.tsx      # Message bubble component
│   ├── contacts-list.tsx    # Contact sidebar
│   ├── conversations-list.tsx # Threads for selected contact
│   └── ...
├── lib/
│   ├── auth.ts              # NextAuth config
│   └── gmail.ts             # Gmail API helpers
└── app/globals.css          # Global styles (Tailwind)
```

## 🔌 API Endpoints

- `POST /api/auth/signin/google` - Google OAuth
- `POST /api/auth/signout` - Sign out
- `GET /api/gmail/threads` - List all email threads
- `GET /api/gmail/thread/[id]` - Get single thread messages
- `POST /api/gmail/send` - Send email reply
- `POST /api/gmail/watch` - Start watching inbox
- `GET /api/gmail/sse` - Server-Sent Events for real-time updates

## 📦 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js (Google OAuth)
- **Email API**: Gmail API v1
- **Real-time**: Server-Sent Events (SSE)
- **Database**: PostgreSQL with Prisma ORM
- **HTML Sanitization**: DOMPurify

## 🎨 Customization

### Theme Colors

Edit `src/app/globals.css` CSS variables:

```css
:root {
  --bg: #0b141a;
  --bg-panel: #111b21;
  --accent: #00a884;
  --text: #e9edef;
  /* ... */
}
```

### Layout

Three-panel layout in `src/app/mail/page.tsx`:
- Left: Contacts (320px - 360px)
- Center: Conversations (360px - 400px)
- Right: Chat view (flex-1)

Mobile: Stacked vertically with back navigation

## 📱 Responsive Breakpoints

- Mobile: < 1024px - Vertical stack
- Tablet: 1024px - Full layout visible
- Desktop: Full three-panel experience

## 🔐 Security

- OAuth 2.0 authentication via Google
- Secure token storage in PostgreSQL
- HTML sanitization with DOMPurify
- Environment variables for sensitive data
- No client-side token storage

## 📚 Resources

- [Gmail API Docs](https://developers.google.com/gmail/api)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com)

## 💡 Future Enhancements

- [ ] Compose new emails
- [ ] Email forwarding
- [ ] Email drafts
- [ ] Labels/categories
- [ ] Full-text search
- [ ] Multi-account support
- [ ] Email templates
- [ ] Scheduled send
- [ ] Email signatures
- [ ] Mobile app (React Native)

## ❓ FAQ

**Q: Is this a Gmail replacement?**
A: No, it's a frontend interface for Gmail that works alongside the official Gmail app.

**Q: Will my emails be stored?**
A: Only session data is stored. Emails are fetched in real-time from Gmail API.

**Q: Can I use this with non-Gmail accounts?**
A: Currently Gmail only.

**Q: Is this free?**
A: Yes! Uses free tier of Google Cloud, Vercel, and Supabase.

---

**Made with ❤️ for email lovers who prefer chat interfaces**
