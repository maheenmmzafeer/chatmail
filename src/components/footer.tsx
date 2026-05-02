import Link from 'next/link';
import { SendIcon } from './icons';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[rgba(17,27,33,0.95)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="mb-5 inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[var(--shadow-glow)]">
                <SendIcon className="ml-0.5 h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-[var(--text)]">ChatMail</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              A premium Gmail experience built around fast triage, chat-style conversations, and a clean, high-density inbox.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Product</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><Link href="#features" className="transition-colors hover:text-[var(--text)]">Features</Link></li>
              <li><Link href="/mail" className="transition-colors hover:text-[var(--text)]">Mail</Link></li>
              <li><Link href="/login" className="transition-colors hover:text-[var(--text)]">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Legal</h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><Link href="/privacy" className="transition-colors hover:text-[var(--text)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-[var(--text)]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ChatMail. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com" className="transition-colors hover:text-[var(--text)]">GitHub</a>
            <a href="https://x.com" className="transition-colors hover:text-[var(--text)]">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}