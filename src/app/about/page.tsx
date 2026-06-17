import InfoPageShell from '@/components/info-page-shell';

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About ChatMail"
      title="A calmer way to work through Gmail."
      description="ChatMail keeps the familiar Gmail workflow, but presents threads in a chat-first layout that is easier to scan, respond to and stay focused inside."
    >
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Why it exists</p>
          <p className="mt-3 max-w-xl text-base leading-8 text-[var(--text-muted)]">
            ChatMail is built for people who want a Gmail experience that feels clearer and less visually dense without changing the underlying workflow.
          </p>
        </div>

        <div className="space-y-0 divide-y divide-[var(--border)]">
          {[
            ['Designed for triage', 'Contacts, thread previews and replies stay in one workspace so you can move faster without losing context.'],
            ['Built on Gmail', 'The app connects to the signed-in Gmail account and surfaces live conversations without changing your email data model.'],
            ['Chat, not clutter', 'Message bubbles, compact metadata and streamlined controls keep the interface familiar while making it feel more intentional.'],
          ].map(([title, copy]) => (
            <div key={title} className="grid gap-2 py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
              <h2 className="text-sm font-semibold text-[var(--text)]">{title}</h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">What it focuses on</p>
          <p className="mt-3 max-w-xl text-base leading-8 text-[var(--text-muted)]">
            The goal is refinement, not reinvention. The app keeps Gmail at the center but reduces visual noise and gives the inbox a more conversational presentation.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-secondary)]">Contact</p>
          <p className="mt-3 max-w-xl text-base leading-8 text-[var(--text-muted)]">
            For support, feedback or partnership questions, reach out at{' '}
            <a href="mailto:03.test.user.2026@gmail.com" className="font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]">
              03.test.user.2026@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </InfoPageShell>
  );
}
