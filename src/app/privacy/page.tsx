import InfoPageShell from '@/components/info-page-shell';

export default function PrivacyPolicy() {
  return (
    <InfoPageShell
      eyebrow="Privacy Policy"
      title="Your email stays yours."
      description="ChatMail is designed to present your Gmail account in a cleaner interface without changing how your data is handled."
    >
      <section className="space-y-4">
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          Your privacy is important to us. ChatMail is designed to be a transparent and secure interface for your Gmail account.
        </p>
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          We do not store your emails, personal messages or contact lists on our servers.
        </p>
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          All authentication is handled securely via Google OAuth 2.0. When you sign in, we receive an access token that allows us to display your emails in real time. This token is stored securely and is only used to facilitate the ChatMail experience.
        </p>
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          We do not share your information with third parties and we do not use your data for advertising or tracking purposes.
        </p>
      </section>

      <section className="grid gap-6 border-t border-[var(--border)] pt-8 lg:grid-cols-[220px_1fr]">
        <h2 className="text-sm font-semibold text-[var(--text)]">Questions</h2>
        <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)]">
          For privacy questions, contact{' '}
          <a href="mailto:03.test.user.2026@gmail.com" className="font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]">
            03.test.user.2026@gmail.com
          </a>
          .
        </p>
      </section>
    </InfoPageShell>
  );
}
