import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center pt-24 px-4 pb-12">
        <div className="glass p-10 rounded-[32px] w-full max-w-2xl space-y-6">
          <h1 className="text-4xl font-extrabold text-white tracking-tight text-center">Privacy Policy</h1>
          <div className="space-y-4 text-[#8696a0] leading-relaxed">
            <p>Your privacy is important to us. ChatMail is designed to be a transparent and secure interface for your Gmail account.</p>
          <p className="bg-white/5 p-4 rounded-xl border border-white/10 text-white font-medium">
            We do NOT store your emails, personal messages, or contact lists on our servers.
          </p>
          <p>All authentication is handled securely via Google OAuth 2.0. When you sign in, we receive an access token that allows us to display your emails in real-time. This token is stored securely and is only used to facilitate the ChatMail experience.</p>
          <p>We do not share your information with third parties, and we do not use your data for advertising or tracking purposes.</p>
        </div>
        <div className="flex flex-col items-center pt-8 border-t border-white/10">
          <span className="text-[#8696a0] mb-2 text-sm">For questions, contact us at</span>
          <a href="mailto:03.test.user.2026@gmail.com" className="text-[#00a884] hover:underline text-lg font-bold">03.test.user.2026@gmail.com</a>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
}
