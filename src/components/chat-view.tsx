"use client";
import { useEffect, useState, useRef } from 'react';
import ChatBubble from './chat-bubble';
import { SendIcon } from './icons';

interface Message {
  id: string;
  from: string;
  to: string;
  subject?: string;
  body: string;
  timestamp: string;
}

export default function ChatView({ threadId, onBack, currentUserEmail }: { threadId?: string; onBack?: () => void; currentUserEmail?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!threadId) return;
    setLoading(true);
    fetch(`/api/gmail/thread/${threadId}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.thread || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading thread:', err);
        setLoading(false);
      });
  }, [threadId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const myEmail = (currentUserEmail || '').toLowerCase();
    const extractEmail = (value?: string) => {
      if (!value) return '';
      const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      return match?.[0]?.toLowerCase() || '';
    };

    const lastOtherMessage = [...messages].reverse().find((msg) => {
      const fromEmail = extractEmail(msg.from);
      return fromEmail && fromEmail !== myEmail;
    });

    const fallback = messages[messages.length - 1];
    const best = extractEmail(lastOtherMessage?.from) || extractEmail(fallback?.to) || extractEmail(fallback?.from) || '';
    setReplyTo(best);
  }, [messages, currentUserEmail]);

  const handleSend = async () => {
    if (!input.trim() || sending || !replyTo || !threadId) return;
    setSending(true);
    try {
      const latestSubject = messages[messages.length - 1]?.subject || 'Re: ChatMail Message';
      const res = await fetch('/api/gmail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: replyTo,
          subject: latestSubject.startsWith('Re:') ? latestSubject : `Re: ${latestSubject}`,
          body: input,
          threadId: threadId
        }),
      });
      if (res.ok) {
        setInput("");
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
        fetch(`/api/gmail/thread/${threadId}`)
          .then(res => res.json())
          .then(data => setMessages(data.thread || []));
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const isMyMessage = (from: string) => {
    const normalizedUserEmail = (currentUserEmail || '').trim().toLowerCase();
    if (!normalizedUserEmail) return false;
    return from?.toLowerCase().includes(normalizedUserEmail);
  };

  return (
    <div className="relative flex h-full flex-col bg-[var(--bg)]">
      
      {/* Thread Header */}
      <header className="z-20 flex h-16 flex-shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-panel)] px-4 sm:px-6">
        <div className="flex items-center gap-4 cursor-pointer group min-w-0 flex-1">
          <button 
            className="lg:hidden -ml-2 flex-shrink-0 rounded-full p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text)]"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-sm font-bold text-white shadow-sm">
            {threadId?.slice(-2).toUpperCase() || "T"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="truncate text-sm font-semibold leading-tight text-[var(--text)]">
              {threadId ? `Thread ${threadId.slice(0, 8)}` : 'Chat'}
            </span>
            <span className="mt-0.5 text-xs font-medium text-[var(--text-muted)]">
              Active now
            </span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 relative overflow-hidden bg-[var(--bg)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

        <div className="absolute inset-0 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar z-10 flex flex-col">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]"></div>
              <p className="text-sm font-medium text-[var(--text-muted)]">Loading thread...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full gap-4 text-center px-8 animate-fade-up">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-surface)] shadow-sm">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-[var(--text-muted)]">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
              </div>
              <p className="text-base font-medium text-[var(--text-muted)]">No messages yet.</p>
              <p className="text-sm text-[var(--text-muted)]">Start a conversation by sending a message.</p>
            </div>
          ) : (
            <div className="space-y-3 max-w-4xl mx-auto w-full">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  message={msg.body}
                  sender={isMyMessage(msg.from) ? 'me' : 'them'}
                  name={msg.from}
                  timestamp={msg.timestamp}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Bar */}
      <footer className="z-20 flex-shrink-0 border-t border-[var(--border)] bg-[var(--bg-panel)] px-4 py-4 sm:px-6">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="relative flex-1 rounded-3xl border border-[var(--border)] bg-[var(--bg-input)] transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/20">
            <textarea
              ref={textareaRef}
              className="min-h-[44px] max-h-28 w-full resize-none bg-transparent px-4 py-3 text-[15px] leading-relaxed text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none custom-scrollbar"
              placeholder="Type a message..."
              rows={1}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                adjustTextareaHeight(e.currentTarget);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || sending || !replyTo}
            className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
              input.trim() && !sending && replyTo
                ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] active:scale-95'
                : 'text-[var(--text-muted)] cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            {sending ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <SendIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
