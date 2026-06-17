import type { ReactNode } from 'react';
import WorkspaceTheme from '@/components/workspace-theme';

export default function MailLayout({ children }: { children: ReactNode }) {
  return (
    <WorkspaceTheme>
      <div className="flex h-screen w-full overflow-hidden bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--accent)]/20">
        {children}
      </div>
    </WorkspaceTheme>
  );
}
