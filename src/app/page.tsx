"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {

  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--accent)]/15 blur-[130px]" />

      <Navbar />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 pt-8 sm:px-6 lg:px-8">
        <section className="grid items-center gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-light)]">
              Gmail, reimagined as a conversation engine
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
              A premium chat-style inbox for faster email triage.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              ChatMail turns Gmail threads into a calm, high-density workspace with contact lists, thread previews, and chat bubbles that feel designed instead of inherited.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/login" className="btn-primary px-6 py-3 text-sm shadow-[var(--shadow-glow)]">
                Connect Gmail
              </Link>
              <Link href="/mail" className="btn-secondary px-6 py-3 text-sm">
                Open mail
              </Link>
            </div>
          </div>

          <div className="card overflow-hidden bg-[rgba(17,27,33,0.92)] p-0 shadow-[var(--shadow-md)]">
            <div className="border-b border-[var(--border)] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text)]">Live Inbox Preview</h2>
                  <p className="text-xs text-[var(--text-muted)]">Thread summaries from the logged-in Gmail account</p>
                </div>
                <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-1 text-xs font-medium text-[var(--accent-light)]">
                  Synced
                </span>
              </div>
            </div>

            <div className="space-y-3 p-5">
              {[
                { name: 'Product Team', msg: 'Can you review the launch draft?', time: '2m' },
                { name: 'Design Ops', msg: 'Updated assets are in the folder.', time: '12m' },
                { name: 'Investor Update', msg: 'Thanks for the weekly metrics.', time: '1h' },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 shadow-[var(--shadow-sm)]">
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[var(--text)]">{item.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{item.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 py-6 md:grid-cols-3">
          {[
            ['Dense threading', 'View contacts, inbox threads, and messages in one focused workspace.'],
            ['Gmail-native', 'Uses the signed-in Gmail account to fetch live conversation data.'],
            ['Fast replies', 'Reply directly in thread and keep the context attached.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-[var(--border)] bg-[rgba(17,27,33,0.88)] p-5 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-sm font-semibold text-[var(--text)]">{title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{copy}</p>
            </div>
          ))}
        </section>

        <Footer />
      </main>
    </div>
  );
}