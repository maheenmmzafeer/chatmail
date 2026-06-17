import InfoPageShell from '@/components/info-page-shell';

export default function TermsOfService() {
  return (
    <InfoPageShell
      eyebrow="Terms of Service"
      title="Simple terms for a focused product."
      description="These terms describe how ChatMail should be used and what you can expect from the service."
    >
      <div className="space-y-4 leading-relaxed">
        <p>By using ChatMail, you agree to these terms. Please read them carefully.</p>

        <div className="surface rounded-2xl p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">1. Acceptable Use</p>
          <p className="mt-2 text-sm leading-relaxed">
            You agree to use ChatMail responsibly and in compliance with all applicable laws and Google&apos;s API service terms.
          </p>
        </div>

        <div className="surface rounded-2xl p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">2. Disclaimer</p>
          <p className="mt-2 text-sm leading-relaxed">
            ChatMail is provided as-is without any warranties. We are not responsible for data loss or service interruptions related to the Gmail API.
          </p>
        </div>

        <div className="surface rounded-2xl p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">3. Account Termination</p>
          <p className="mt-2 text-sm leading-relaxed">
            We reserve the right to terminate or restrict access to the interface if we detect a violation of these terms or misuse of the service.
          </p>
        </div>
      </div>

      <div className="surface rounded-2xl p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Contact</p>
        <p className="mt-3 leading-relaxed">
          For questions, contact{' '}
          <a href="mailto:03.test.user.2026@gmail.com" className="font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]">
            03.test.user.2026@gmail.com
          </a>
          .
        </p>
      </div>
    </InfoPageShell>
  );
}
