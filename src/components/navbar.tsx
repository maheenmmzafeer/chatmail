"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { SendIcon, NewChatIcon, MenuIcon } from './icons';
import Button from './Button';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isApp = pathname?.startsWith('/mail');

  if (isApp) {
    return (
      <header className="glass-panel sticky top-0 z-50 border-b border-[var(--border)] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.01]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[var(--shadow-glow)]">
              <SendIcon className="ml-0.5 h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--text)]">ChatMail</div>
              <div className="text-xs text-[var(--text-muted)]">Gmail in chat form</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button href="/mail" variant="secondary" size="sm" className="hidden md:inline-flex">
              <NewChatIcon className="h-4 w-4" />
              Compose
            </Button>
            <button className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]">
              <MenuIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-2 py-1.5 transition-colors hover:bg-[var(--bg-hover)]"
            >
              <img
                src={session?.user?.image || '/avatar.png'}
                alt={session?.user?.name || 'Account'}
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="hidden text-sm font-medium text-[var(--text)] sm:block">
                {session?.user?.name?.split(' ')[0] || 'User'}
              </span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6">
      <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-[var(--border)] px-4 py-3 shadow-[var(--shadow-sm)] sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[var(--shadow-glow)]">
            <SendIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="text-base font-semibold text-[var(--text)]">ChatMail</div>
            <div className="text-xs text-[var(--text-muted)]">Premium Gmail chat UI</div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="#features" className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]">
            Features
          </Link>
          <Link href="/privacy" className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]">
            Privacy
          </Link>
          <Link href="/terms" className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]">
            Terms
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button href="/login" variant="secondary" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button href="/login" size="sm">
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}