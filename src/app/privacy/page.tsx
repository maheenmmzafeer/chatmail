import InfoPageShell from '@/components/info-page-shell';

export default function PrivacyPolicy() {
  return (
    <InfoPageShell
      eyebrow="Privacy Policy"
      title="Your email stays yours."
      description="ChatMail is designed to present your Gmail account in a cleaner interface without changing how your data is handled."
    >
      <div className="space-y-4 leading-relaxed">
        <p>
          Your privacy is important to us. ChatMail is designed to be a transparent and secure interface for your Gmail account.
        </p>
        <div className="surface rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/10 p-5 text-[var(--text)]">
          We do not store your emails, personal messages, or contact lists on our servers.
        </div>
        <p>
          All authentication is handled securely via Google OAuth 2.0. When you sign in, we receive an access token that allows us to display your emails in real time. This token is stored securely and is only used to facilitate the ChatMail experience.
        </p>
        <p>
          We do not share your information with third parties and we do not use your data for advertising or tracking purposes.
        </p>
      </div>

      <div className="surface rounded-2xl p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Questions</p>
        <p className="mt-3 leading-relaxed">
          For privacy questions, contact{' '}
          <a href="mailto:03.test.user.2026@gmail.com" className="font-medium text-[var(--accent-light)] transition-colors hover:text-[var(--text)]">
            03.test.user.2026@gmail.com
          </a>
          .
        </p>
      </div>
    </InfoPageShell>
  );
}
