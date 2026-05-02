"use client";

import { signIn } from 'next-auth/react';
import { SendIcon } from '@/components/icons';

type LoginClientProps = {
  error?: string;
};

export default function LoginClient({ error }: LoginClientProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00a884]/12 blur-[140px]" />

      <div className="relative w-full max-w-md rounded-[28px] border border-[var(--border)] bg-[rgba(17,27,33,0.92)] p-8 shadow-[var(--shadow-md)] backdrop-blur-2xl sm:p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00a884] shadow-xl">
            <SendIcon className="ml-0.5 h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">Welcome to ChatMail</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">Sign in with Google to securely sync your Gmail threads.</p>
        </div>

        {error ? (
          <div className="mb-5 w-full rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200">
            Sign-in failed. Check your Google OAuth settings, then try again.
          </div>
        ) : null}

        <button
          className="flex w-full items-center justify-center gap-4 rounded-2xl bg-white py-4 font-semibold text-[#1f1f1f] shadow-xl transition-all hover:bg-gray-100 active:scale-[0.98]"
          onClick={() => signIn('google', { callbackUrl: '/mail' })}
        >
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24.5V29.1H37.4C36.8 32.1 34.7 34.6 31.7 36.3V42.1H39.2C44 38 47.5 31.9 47.5 24.5Z" fill="#4285F4"/>
            <path d="M24.5 48C31.1 48 36.7 45.8 39.2 42.1L31.7 36.3C30.3 37.2 28.5 37.8 26.5 37.8C20.2 37.8 14.9 33.7 13.1 28.1H5.3V34.1C7.8 39.3 15.5 48 24.5 48Z" fill="#34A853"/>
            <path d="M13.1 28.1C12.6 26.2 12.6 24.2 13.1 22.3V16.3H5.3C2.7 21.1 2.7 26.9 5.3 34.1L13.1 28.1Z" fill="#FBBC05"/>
            <path d="M24.5 10.2C27.1 10.2 29.4 11.1 31.2 12.8L39.3 5.1C36.6 2.6 31.1 0 24.5 0C15.5 0 7.8 8.7 5.3 16.3L13.1 22.3C14.9 16.7 20.2 10.2 24.5 10.2Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-[var(--text-muted)]">
          By continuing, you agree to ChatMail&apos;s Terms of Service and Privacy Policy.
          We only access your email to display it in a conversational format.
        </p>
      </div>
    </div>
  );
}