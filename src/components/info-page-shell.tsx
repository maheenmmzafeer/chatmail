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
        <main className="relative px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pt-14">
          <div className="mx-auto flex w-full max-w-6xl justify-center">
            <article className="w-full max-w-4xl rounded-[32px] border border-[var(--border)] bg-[var(--bg-panel)] px-5 py-7 shadow-[var(--shadow-md)] backdrop-blur-2xl sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <header className="mx-auto max-w-2xl text-center">
                {eyebrow ? (
                  <p className="mb-4 inline-flex rounded-full border border-[var(--accent)]/18 bg-[var(--accent)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-light)]">
                    {eyebrow}
                  </p>
                ) : null}
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
                    {description}
                  </p>
                ) : null}
              </header>

              <div className="mt-10 space-y-8 text-[var(--text-muted)]">{children}</div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </PublicTheme>
  );
}
