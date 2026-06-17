"use client";

import ContactsList from '@/components/contacts-list';
import ConversationsList from '@/components/conversations-list';
import ChatView from '@/components/chat-view';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { StatusIcon, NewChatIcon, LockIcon, SearchIcon, SendIcon } from '@/components/icons';

export default function MailPage() {
  const [selectedContact, setSelectedContact] = useState<string | undefined>(undefined);
  const [selectedThread, setSelectedThread] = useState<string | undefined>(undefined);
  const [view, setView] = useState<'contacts' | 'conversations' | 'chat'>('contacts');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (selectedContact && view === 'contacts') setView('conversations');
  }, [selectedContact]);

  useEffect(() => {
    if (selectedThread && view === 'conversations') setView('chat');
  }, [selectedThread]);

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
          <p className="text-sm text-[var(--text-muted)]">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      
      <header className="z-50 flex h-16 flex-shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-panel)] px-4 shadow-[var(--shadow-sm)] lg:px-6">
        <div className="flex w-[280px] items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] shadow-[var(--shadow-glow)]">
             <SendIcon className="text-white w-4 h-4 ml-0.5" />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight text-[var(--text)] sm:block">ChatMail</span>
        </div>

        <div className="mx-4 hidden flex-1 max-w-xl md:block">
          <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-input)] px-4 py-2 transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/20">
            <SearchIcon className="h-4 w-4 text-[var(--text-muted)]" />
            <input
              className="flex-1 bg-transparent border-none text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
              placeholder="Search in mail..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="hidden rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--accent-light)] sm:block">
            <StatusIcon className="w-5 h-5" />
          </button>
          <div className="mx-2 hidden h-6 w-px bg-[var(--border)] sm:block"></div>
          <div className="group flex cursor-pointer items-center gap-3" onClick={() => { if(confirm("Sign out?")) signOut(); }}>
            <div className="flex flex-col items-end hidden lg:flex">
              <span className="text-sm font-semibold leading-tight text-[var(--text)]">{session?.user?.name || 'Workspace'}</span>
              <span className="text-xs text-[var(--text-muted)]">{session?.user?.email || 'User'}</span>
            </div>
            <div className="relative">
              <img 
                src={session?.user?.image || "/avatar.png"} 
                alt="Profile" 
                className="relative w-9 h-9 rounded-full object-cover border border-[var(--border)]" 
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <aside className={`
          ${view === 'contacts' ? 'flex' : 'hidden lg:flex'}
          w-full flex-col border-r border-[var(--border)] bg-[var(--bg-panel)] lg:w-[320px] xl:w-[360px]
        `}>
          <div className="p-4 pb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">Contacts</h2>
            <button className="rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--accent-light)]">
              <NewChatIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden px-2">
            <ContactsList 
              onSelect={(id) => { setSelectedContact(id); setView('conversations'); }} 
              selectedId={selectedContact} 
            />
          </div>
        </aside>

        <section className={`
          ${view === 'conversations' ? 'flex' : 'hidden lg:flex'}
          w-full flex-col border-r border-[var(--border)] bg-[var(--bg-panel)] lg:w-[360px] xl:w-[400px]
        `}>
          <div className="p-4 pb-2 flex items-center gap-4">
            <button 
              className="lg:hidden -ml-2 rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
              onClick={() => setView('contacts')}
            >
               <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
               </svg>
            </button>
            <h2 className="text-base font-semibold tracking-tight text-[var(--text)]">Inbox</h2>
          </div>
          <div className="flex-1 overflow-hidden px-2">
            {selectedContact ? (
              <ConversationsList 
                contactId={selectedContact} 
                onSelect={(id) => { setSelectedThread(id); setView('chat'); }} 
                selectedId={selectedThread} 
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--bg-surface)]">
                   <LockIcon className="w-6 h-6 text-[var(--text-muted)]" />
                </div>
                <p className="mb-1 text-base font-semibold text-[var(--text)]">No contact selected</p>
                <p className="text-sm text-[var(--text-muted)]">Choose a contact from the sidebar.</p>
              </div>
            )}
          </div>
        </section>

        <main className={`
          ${view === 'chat' ? 'flex' : 'hidden lg:flex'}
          flex-1 flex-col bg-[var(--bg)] relative overflow-hidden
        `}>
          {selectedThread ? (
            <ChatView 
              threadId={selectedThread} 
              currentUserEmail={session?.user?.email || ''}
              onBack={() => { setSelectedThread(undefined); setView('conversations'); }} 
            />
          ) : (
            <div className="relative flex flex-1 flex-col items-center justify-center p-8">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 flex max-w-md flex-col items-center space-y-6 rounded-[28px] border border-[var(--border)] bg-[var(--bg-panel)] p-10 text-center shadow-[var(--shadow-md)]">
                <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)]/10">
                  <SendIcon className="ml-1 h-8 w-8 text-[var(--accent)]" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)]">ChatMail</h2>
                  <p className="text-base leading-relaxed text-[var(--text-muted)]">
                    Your Gmail inbox, beautifully reimagined as a chat interface. Select a thread to start messaging.
                  </p>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--bg-surface)] px-4 py-2 text-xs text-[var(--text-muted)]">
                  <LockIcon className="h-3 w-3 text-[var(--accent)]" />
                  End-to-end encrypted connection
                </div>
              </div>
            </div>
          )}
        </main>
        
      </div>
    </div>
  );
}
