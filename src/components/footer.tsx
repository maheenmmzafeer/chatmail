import Link from 'next/link';
import { SendIcon } from './icons';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--bg-panel)] px-4 py-10 text-[var(--text)] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] shadow-[var(--shadow-glow)]">
                <SendIcon className="ml-0.5 h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-[var(--text)]">ChatMail</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
              A premium Gmail experience built around fast triage, chat-style conversations and a clean, high-density inbox.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:w-[52%]">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Product</h3>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li><Link href="/" className="transition-colors hover:text-[var(--text)]">Home</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-[var(--text)]">About</Link></li>
                <li><Link href="/mail" className="transition-colors hover:text-[var(--text)]">Mail</Link></li>
                <li><Link href="/login" className="transition-colors hover:text-[var(--text)]">Login</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Legal</h3>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li><Link href="/privacy" className="transition-colors hover:text-[var(--text)]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-[var(--text)]">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Contact</h3>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li>
                  <a href="mailto:03.test.user.2026@gmail.com" className="transition-colors hover:text-[var(--text)]">
                    Email support
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/maheenmmzafeer/chatmail"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[var(--text)]"
                  >
                    GitHub repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} ChatMail. All rights reserved.</p>
          <p className="max-w-md">Built to keep Gmail conversations calm, legible and quick to scan.</p>
        </div>
      </div>
    </footer>
  );
}
