import InfoPageShell from '@/components/info-page-shell';

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About ChatMail"
      title="A calmer way to work through Gmail."
      description="ChatMail keeps the familiar Gmail workflow, but presents threads in a chat-first layout that is easier to scan, respond to, and stay focused inside."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Designed for triage',
            copy: 'Contacts, thread previews, and replies stay in one focused workspace so you can move faster without losing context.',
          },
          {
            title: 'Built on Gmail',
            copy: 'The app connects to the signed-in Gmail account and surfaces live conversations without changing your email data model.',
          },
          {
            title: 'Chat, not clutter',
            copy: 'Message bubbles, compact metadata, and streamlined controls keep the interface familiar while making it feel more intentional.',
          },
        ].map((item) => (
          <div key={item.title} className="surface rounded-2xl p-5 shadow-[var(--shadow-sm)]">
            <h2 className="text-sm font-semibold text-[var(--text)]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed">{item.copy}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="surface rounded-2xl p-6">
          <h2 className="text-base font-semibold text-[var(--text)]">What ChatMail focuses on</h2>
          <p className="mt-3 leading-relaxed">
            The goal is refinement, not reinvention. The app keeps Gmail at the center, but reduces visual noise and gives the inbox a more conversational, production-ready presentation.
          </p>
        </div>

        <div className="surface rounded-2xl p-6">
          <h2 className="text-base font-semibold text-[var(--text)]">Contact</h2>
          <p className="mt-3 leading-relaxed">
            For support, feedback, or partnership questions, reach out at{' '}
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
