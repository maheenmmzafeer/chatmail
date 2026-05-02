import type { ReactNode } from 'react';

export default function MailLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[var(--bg)] text-[var(--text)] overflow-hidden selection:bg-[var(--accent)]/30">
      {children}
    </div>
  );
}
