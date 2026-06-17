import InfoPageShell from '@/components/info-page-shell';

export default function TermsOfService() {
  return (
    <InfoPageShell
      eyebrow="Terms of Service"
      title="Simple terms for a focused product."
      description="These terms describe how ChatMail should be used and what you can expect from the service."
    >
      <section className="space-y-4">
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          By using ChatMail, you agree to these terms. Please read them carefully.
        </p>

        {[
          ['1. Acceptable Use', 'You agree to use ChatMail responsibly and in compliance with all applicable laws and Google&apos;s API service terms.'],
          ['2. Disclaimer', 'ChatMail is provided as-is without any warranties. We are not responsible for data loss or service interruptions related to the Gmail API.'],
          ['3. Account Termination', 'We reserve the right to terminate or restrict access to the interface if we detect a violation of these terms or misuse of the service.'],
        ].map(([title, copy]) => (
          <div key={title} className="grid gap-2 border-t border-[var(--border)] pt-5 sm:grid-cols-[220px_1fr] sm:gap-6">
            <h2 className="text-sm font-semibold text-[var(--text)]">{title}</h2>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">{copy}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[220px_1fr]">
        <h2 className="text-sm font-semibold text-[var(--text)]">Contact</h2>
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          For questions, contact{' '}
          <a href="mailto:03.test.user.2026@gmail.com" className="font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]">
            03.test.user.2026@gmail.com
          </a>
          .
        </p>
      </section>
    </InfoPageShell>
  );
}
