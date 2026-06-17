import type { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PublicTheme from '@/components/public-theme';

type InfoPageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function InfoPageShell({
  eyebrow,
  title,
  description,
  children,
}: InfoPageShellProps) {
  return (
    <PublicTheme>
      <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(95,119,255,0.12),transparent_55%)]" />
        <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(127,146,255,0.14)] blur-3xl" />
        <Navbar />
        <main className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          <section className="grid gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-14">
            <div className="max-w-2xl">
              {eyebrow ? (
                <p className="mb-5 inline-flex rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-light)]">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex h-full flex-col justify-center border-l border-[var(--border)] pl-0 lg:pl-10">
              <div className="max-w-xl space-y-4 text-[var(--text-muted)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Overview</p>
                <p className="text-sm leading-relaxed sm:text-base">
                  ChatMail keeps Gmail conversations easy to follow by presenting threads in a chat-style layout.
                </p>
                <p className="text-sm leading-relaxed sm:text-base">
                  If you are reviewing the project, start with the home page, then read the About, Privacy Policy and Terms pages for a clear summary of scope and usage.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-8 border-t border-[var(--border)] pt-8 text-[var(--text-muted)]">
            {children}
          </section>
        </main>
        <Footer />
      </div>
    </PublicTheme>
  );
}
