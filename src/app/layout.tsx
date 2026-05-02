import './globals.css';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ClientLayout from '@/components/client-layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'ChatMail - Gmail with WhatsApp Interface',
  description: 'Experience Gmail in a modern chat interface',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} bg-[var(--bg)] text-[var(--text)] antialiased font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
