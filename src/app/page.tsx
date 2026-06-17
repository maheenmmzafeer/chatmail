"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PublicTheme from '@/components/public-theme';
import { LockIcon, SendIcon } from '@/components/icons';

const threadPreview = [
  {
    name: 'Product Team',
    time: '2m',
    snippet: 'Can you review the launch draft before the meeting?',
    accent: 'bg-[rgba(95,119,255,0.12)]',
  },
  {
    name: 'Design Ops',
    time: '12m',
    snippet: 'The updated assets are in the shared folder.',
    accent: 'bg-[rgba(96,205,170,0.12)]',
  },
  {
    name: 'Investor Update',
    time: '1h',
    snippet: 'Thanks for sending the weekly metrics summary.',
    accent: 'bg-[rgba(249,177,67,0.12)]',
  },
];

const features = [
  {
    title: 'Conversation-first inbox',
    copy: 'Threads read more naturally when Gmail is presented as a chat flow instead of a dense email list.',
  },
  {
    title: 'Built for quick triage',
    copy: 'Contacts, thread previews and reply controls stay close together so it is easier to move quickly.',
  },
  {
    title: 'Designed to feel calm',
    copy: 'The layout uses whitespace, lighter surfaces and restrained color to keep the interface readable.',
  },
];

export default function Home() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <PublicTheme>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
            <p className="text-sm text-[var(--text-muted)]">Loading ChatMail...</p>
          </div>
        </div>
      </PublicTheme>
    );
  }

  return (
    <PublicTheme>
      <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(95,119,255,0.12),transparent_52%)]" />
        <div className="pointer-events-none absolute left-[-4rem] top-32 -z-10 h-72 w-72 rounded-full bg-[rgba(96,205,170,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-6rem] top-40 -z-10 h-80 w-80 rounded-full bg-[rgba(127,146,255,0.12)] blur-3xl" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45" />

        <Navbar />

        <main className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <section className="grid items-center gap-12 py-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-light)]">
                Gmail, reimagined as a conversation engine
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                A lighter inbox for faster Gmail conversations.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                ChatMail turns Gmail threads into a calm workspace with chat-style messages, quick thread scanning and a cleaner way to stay on top of email without changing how you work.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/login" className="btn-primary px-6 py-3 text-sm">
                  Connect Gmail
                </Link>
                <Link href="/mail" className="btn-secondary px-6 py-3 text-sm">
                  Open mail
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-2">
                  <LockIcon className="h-4 w-4 text-[var(--accent)]" />
                  Secure Google sign-in
                </span>
                <span className="inline-flex items-center gap-2">
                  <SendIcon className="h-4 w-4 text-[var(--accent)]" />
                  Chat-style Gmail threads
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-20 w-20 rounded-full bg-[rgba(95,119,255,0.12)] blur-2xl" />
              <div className="absolute -bottom-6 right-8 h-24 w-24 rounded-full bg-[rgba(96,205,170,0.14)] blur-2xl" />

              <div className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--bg-panel)] shadow-[var(--shadow-md)] backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">Live inbox preview</p>
                    <p className="text-xs text-[var(--text-muted)]">Thread summaries from a signed-in Gmail account</p>
                  </div>
                  <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent-light)]">
                    Synced
                  </span>
                </div>

                <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="border-b border-[var(--border)] bg-[rgba(255,255,255,0.45)] p-4 lg:border-b-0 lg:border-r">
                    <div className="space-y-3">
                      {threadPreview.map((item) => (
                        <div key={item.name} className={`rounded-2xl border border-[var(--border)] ${item.accent} px-4 py-3`}>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold text-[var(--text)]">{item.name}</span>
                            <span className="text-xs text-[var(--text-muted)]">{item.time}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.snippet}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[rgba(255,255,255,0.7)] p-4 sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text)]">Product Team</p>
                        <p className="text-xs text-[var(--text-muted)]">Thread open in chat view</p>
                      </div>
                      <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--text-muted)]">
                        Active now
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="ml-auto max-w-[86%] rounded-[22px] rounded-br-sm bg-[var(--sent-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--sent-text)] shadow-[var(--shadow-sm)]">
                        Can you review the launch draft before the meeting?
                      </div>
                      <div className="max-w-[86%] rounded-[22px] rounded-bl-sm border border-[var(--border)] bg-[var(--received-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--received-text)] shadow-[var(--shadow-sm)]">
                        Updated notes are in the shared folder. I also tightened the summary section.
                      </div>
                      <div className="ml-auto max-w-[86%] rounded-[22px] rounded-br-sm bg-[var(--sent-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--sent-text)] shadow-[var(--shadow-sm)]">
                        Perfect. I will polish the final pass now.
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-xs text-[var(--text-muted)]">
                      <span>Replying in the current Gmail thread</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-8 sm:py-10">
            <div className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Why it feels different</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                  A calm layout that keeps the product story clear.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)]">
                  Instead of many framed cards, the page uses spacing, hierarchy and a single strong preview to make the experience feel lighter and more polished.
                </p>
              </div>

              <div className="space-y-0 divide-y divide-[var(--border)]">
                {features.map((feature, index) => (
                  <div key={feature.title} className="grid gap-3 py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">{feature.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">{feature.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 sm:py-10">
            <div className="flex flex-col gap-6 rounded-[28px] border border-[var(--border)] bg-[var(--bg-panel)] px-6 py-7 shadow-[var(--shadow-sm)] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Get started</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
                  Start with Gmail and see conversations in a cleaner format.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
                  Sign in once and move between the landing page, policy pages and the mail workspace with the same simple flow.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/login" className="btn-primary px-6 py-3 text-sm">
                  Connect Gmail
                </Link>
                <Link href="/about" className="btn-secondary px-6 py-3 text-sm">
                  Learn more
                </Link>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </PublicTheme>
  );
}
