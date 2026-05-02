import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function TermsOfService() {
  return (
  <div className="flex flex-col min-h-screen">
        <Navbar />    
    <main className="min-h-screen flex flex-col items-center justify-center pt-32 px-4 pb-12 bg-[#09090b] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="glass p-10 rounded-[2rem] w-full max-w-2xl space-y-8 relative z-10 animate-slide-in-up">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Terms of Service</h1>
          <p className="text-zinc-400 font-medium">Last updated: 03 May, 2026</p>
        </div>
        
        <div className="space-y-4 text-zinc-300 leading-relaxed font-light">
          <p>By using ChatMail, you agree to these terms. Please read them carefully.</p>
          <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 space-y-2">
            <p className="text-zinc-100 font-medium">1. Acceptable Use</p>
            <p className="text-sm text-zinc-400">You agree to use ChatMail responsibly and in compliance with all applicable laws and Google's API service terms.</p>
          </div>
          <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 space-y-2">
            <p className="text-zinc-100 font-medium">2. Disclaimer</p>
            <p className="text-sm text-zinc-400">ChatMail is provided "as-is" without any warranties. We are not responsible for any data loss or service interruptions related to the Gmail API.</p>
          </div>
          <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 space-y-2">
            <p className="text-zinc-100 font-medium">3. Account Termination</p>
            <p className="text-sm text-zinc-400">We reserve the right to terminate or restrict access to our interface if we detect any violation of these terms or misuse of the service.</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center pt-8 border-t border-white/5">
          <span className="text-zinc-500 mb-2 text-sm font-medium">For questions, contact us at</span>
          <a href="mailto:03.test.user.2026@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors text-lg font-semibold">03.test.user.2026@gmail.com</a>
        </div>
      </div>
    </main>
      <Footer />
        </div>
  );
}
