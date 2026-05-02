"use client";
import { useEffect, useState, useRef } from 'react';
import ChatBubble from './chat-bubble';
import { EmojiIcon, AttachIcon, SendIcon, MenuIcon } from './icons';

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
    <div className="flex flex-col h-full bg-[var(--bg)] relative">
      
      {/* Thread Header */}
      <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 bg-[var(--bg-panel)] border-b border-[var(--border)] z-20">
        <div className="flex items-center gap-4 cursor-pointer group min-w-0 flex-1">
          <button 
            className="lg:hidden p-2 -ml-2 text-[#8696a0] hover:text-[#e9edef] hover:bg-[var(--bg-hover)] rounded-full transition-colors flex-shrink-0"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00a884] to-[#008069] flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
            {threadId?.slice(-2).toUpperCase() || "T"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[#e9edef] font-semibold text-sm truncate leading-tight">
              {threadId ? `Thread ${threadId.slice(0, 8)}` : 'Chat'}
            </span>
            <span className="text-[#8696a0] text-xs font-medium mt-0.5">
              Active now
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-[#8696a0] hover:text-[#e9edef] hover:bg-[var(--bg-hover)] rounded-full transition-colors flex-shrink-0" aria-label="More options">
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 relative overflow-hidden bg-[var(--bg)]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

        <div className="absolute inset-0 overflow-y-auto px-4 sm:px-8 py-6 custom-scrollbar z-10 flex flex-col">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-full gap-4">
              <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[#00a884] rounded-full animate-spin"></div>
              <p className="text-[#8696a0] text-sm font-medium">Loading thread...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full gap-4 text-center px-8 animate-fade-up">
              <div className="w-20 h-20 bg-[var(--bg-surface)] border border-[var(--border)] rounded-full flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-[#8696a0]">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
              </div>
              <p className="text-[#8696a0] text-base font-medium">No messages yet.</p>
              <p className="text-[#8696a0] text-sm">Start a conversation by sending a message.</p>
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
      <footer className="px-4 sm:px-6 py-4 bg-[var(--bg-panel)] border-t border-[var(--border)] z-20 flex-shrink-0">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex gap-1">
            <button 
              className="p-2.5 text-[#8696a0] hover:text-[#00a884] hover:bg-[var(--bg-hover)] rounded-full transition-all flex-shrink-0"
              aria-label="Add emoji"
            >
              <EmojiIcon className="w-6 h-6" />
            </button>
            <button 
              className="p-2.5 text-[#8696a0] hover:text-[#00a884] hover:bg-[var(--bg-hover)] rounded-full transition-all flex-shrink-0"
              aria-label="Attach file"
            >
              <AttachIcon className="w-6 h-6 -rotate-45" />
            </button>
          </div>
          
          <div className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-3xl relative focus-within:ring-1 focus-within:ring-[#00a884] focus-within:border-[#00a884] transition-all">
            <textarea
              ref={textareaRef}
              className="w-full bg-transparent text-[#e9edef] px-4 py-3 focus:outline-none text-[15px] placeholder-[#8696a0] resize-none min-h-[44px] max-h-28 custom-scrollbar leading-relaxed"
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
                ? 'bg-[#00a884] text-white hover:bg-[#008069] active:scale-95'
                : 'text-[#8696a0] cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            {sending ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <SendIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
