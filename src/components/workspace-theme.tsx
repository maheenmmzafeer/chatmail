import type { ReactNode } from 'react';

const workspaceThemeClasses =
  'min-h-screen bg-[var(--bg)] text-[var(--text)] [--bg:#f7f8fc] [--bg-panel:rgba(255,255,255,0.9)] [--bg-surface:#eef2f8] [--bg-hover:#e5ebf4] [--bg-input:#ffffff] [--accent:#5f77ff] [--accent-light:#7f92ff] [--accent-dark:#4f67e6] [--text:#172033] [--text-secondary:#475569] [--text-muted:#64748b] [--border:rgba(15,23,42,0.08)] [--border-light:rgba(15,23,42,0.12)] [--sent-bg:#dfe8ff] [--sent-text:#172033] [--received-bg:#ffffff] [--received-text:#172033] [--shadow-sm:0_8px_24px_rgba(15,23,42,0.06)] [--shadow-md:0_28px_80px_rgba(15,23,42,0.08)] [--shadow-glow:0_0_0_1px_rgba(95,119,255,0.14),0_24px_70px_rgba(95,119,255,0.16)]';

export default function WorkspaceTheme({ children }: { children: ReactNode }) {
  return <div className={workspaceThemeClasses}>{children}</div>;
}
