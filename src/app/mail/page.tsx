"use client";

import ContactsList from '@/components/contacts-list';
import ConversationsList from '@/components/conversations-list';
import ChatView from '@/components/chat-view';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { StatusIcon, NewChatIcon, MenuIcon, LockIcon, SearchIcon, SendIcon } from '@/components/icons';

export default function MailPage() {
  const [selectedContact, setSelectedContact] = useState<string | undefined>(undefined);
  const [selectedThread, setSelectedThread] = useState<string | undefined>(undefined);
  const [view, setView] = useState<'contacts' | 'conversations' | 'chat'>('contacts');
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle view switching on mobile
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
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[var(--bg)]">
        <div className="w-12 h-12 border-4 border-[#00a884] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--bg)] text-[#e9edef] font-sans overflow-hidden">
      
      {/* Global Top Appbar */}
      <header className="h-[60px] flex-shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--border)] bg-[var(--bg-panel)] z-50">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 w-[280px]">
          <div className="w-8 h-8 bg-[#00a884] rounded-lg flex items-center justify-center shadow-lg">
             <SendIcon className="text-white w-4 h-4 ml-0.5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#e9edef] hidden sm:block">ChatMail</span>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="flex items-center gap-3 bg-[var(--bg-surface)] rounded-lg px-4 py-2 focus-within:ring-1 focus-within:ring-[#00a884] transition-all">
            <SearchIcon className="text-[#8696a0] w-4 h-4" />
            <input
              className="flex-1 bg-transparent border-none focus:outline-none text-[#e9edef] text-sm placeholder-[#8696a0]"
              placeholder="Search in mail..."
            />
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3 justify-end">
          <button className="p-2 text-[#8696a0] hover:text-[#00a884] hover:bg-[var(--bg-hover)] rounded-full transition-colors hidden sm:block">
            <StatusIcon className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-[var(--border)] mx-2 hidden sm:block"></div>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { if(confirm("Sign out?")) signOut(); }}>
            <div className="flex flex-col items-end hidden lg:flex">
              <span className="text-sm font-semibold text-[#e9edef] leading-tight">{session?.user?.name || 'Workspace'}</span>
              <span className="text-xs text-[#8696a0]">{session?.user?.email || 'User'}</span>
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

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar: Contacts */}
        <aside className={`
          ${view === 'contacts' ? 'flex' : 'hidden lg:flex'}
          w-full lg:w-[320px] xl:w-[360px] flex-col border-r border-[var(--border)] bg-[var(--bg)]
        `}>
          <div className="p-4 pb-2 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#e9edef] tracking-tight">Contacts</h2>
            <button className="p-2 text-[#8696a0] hover:bg-[var(--bg-hover)] hover:text-[#00a884] rounded-full transition-colors">
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

        {/* Middle Panel: Threads */}
        <section className={`
          ${view === 'conversations' ? 'flex' : 'hidden lg:flex'}
          w-full lg:w-[360px] xl:w-[400px] flex-col border-r border-[var(--border)] bg-[var(--bg)]
        `}>
          <div className="p-4 pb-2 flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-[#8696a0] hover:text-[#e9edef] hover:bg-[var(--bg-hover)] rounded-full transition-colors"
              onClick={() => setView('contacts')}
            >
               <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
               </svg>
            </button>
            <h2 className="text-base font-semibold text-[#e9edef] tracking-tight">Inbox</h2>
          </div>
          <div className="flex-1 overflow-hidden px-2">
            {selectedContact ? (
              <ConversationsList 
                contactId={selectedContact} 
                onSelect={(id) => { setSelectedThread(id); setView('chat'); }} 
                selectedId={selectedThread} 
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 h-full">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] flex items-center justify-center mb-4">
                   <LockIcon className="w-6 h-6 text-[#8696a0]" />
                </div>
                <p className="font-semibold text-[#e9edef] text-base mb-1">No Contact Selected</p>
                <p className="text-sm text-[#8696a0]">Choose a contact from the sidebar.</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Panel: Chat/Mail Content */}
        <main className={`
          ${view === 'chat' ? 'flex' : 'hidden lg:flex'}
          flex-1 flex-col bg-[var(--bg-panel)] relative overflow-hidden
        `}>
          {selectedThread ? (
            <ChatView 
              threadId={selectedThread} 
              currentUserEmail={session?.user?.email || ''}
              onBack={() => { setSelectedThread(undefined); setView('conversations'); }} 
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center relative p-8">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
              
              <div className="flex flex-col items-center max-w-md text-center space-y-6 relative z-10 p-10 bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-xl">
                <div className="w-20 h-20 rounded-full bg-[#00a884]/10 flex items-center justify-center mb-2">
                  <SendIcon className="text-[#00a884] w-8 h-8 ml-1" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold tracking-tight text-[#e9edef]">ChatMail</h2>
                  <p className="text-[#8696a0] text-base leading-relaxed">
                    Your Gmail inbox, beautifully reimagined as a chat interface. Select a thread to start messaging.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-[#8696a0] text-xs px-4 py-2 rounded-full bg-[var(--bg-surface)] mt-2">
                  <LockIcon className="w-3 h-3 text-[#00a884]" />
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
