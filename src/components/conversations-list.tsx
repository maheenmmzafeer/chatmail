"use client";
import { useEffect, useState } from 'react';
import { SearchIcon } from './icons';

interface Thread {
  id: string;
  snippet: string;
  unread: boolean;
  lastMessageTime: string;
  subject: string;
  participantEmails: string[];
}

interface ConversationsListProps {
  contactId?: string;
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export default function ConversationsList({ contactId, onSelect, selectedId }: ConversationsListProps) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const formatRelativeTime = (timestamp: string) => {
    const value = Number(timestamp);
    if (!value) return '---';
    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'Now';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffMinutes < 24 * 60) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/gmail/threads')
      .then(res => res.json())
      .then(data => {
        const allThreads: Thread[] = (data.threads || []).map((thread: any) => ({
          id: thread.id,
          subject: thread.subject || '(No subject)',
          snippet: thread.snippet || 'No preview available...',
          unread: Boolean(thread.unread),
          lastMessageTime: formatRelativeTime(thread.lastMessageTime || ''),
          participantEmails: thread.participantEmails || [],
        }));

        if (!contactId) {
          setThreads(allThreads);
        } else {
          const filtered = allThreads.filter((thread) =>
            (thread.participantEmails || []).some((email) => email.toLowerCase() === contactId.toLowerCase()),
          );
          setThreads(filtered);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading threads:', err);
        setLoading(false);
      });
  }, [contactId]);

  const filteredThreads = threads.filter(t =>
    t.snippet?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full bg-transparent">
      
      {/* Search Bar */}
      <div className="mb-4 px-2">
        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-input)] px-4 py-2.5 transition-all focus-within:border-[var(--accent)] focus-within:ring-1 focus-within:ring-[var(--accent)]/20">
          <SearchIcon className="h-4 w-4 flex-shrink-0 text-[var(--text-muted)]" />
          <input
            className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-1.5 pb-4 space-y-1.5 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-4 animate-pulse">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"></div>
            <span className="text-xs font-semibold tracking-wider text-[var(--text-muted)]">LOADING</span>
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm font-medium text-[var(--text-muted)]">
            {searchTerm ? `No conversations match "${searchTerm}"` : 'No threads found.'}
          </div>
        ) : (
          filteredThreads.map(thread => {
            const isActive = selectedId === thread.id;
            return (
              <div
                key={thread.id}
                onClick={() => onSelect && onSelect(thread.id)}
                className={`
                  flex cursor-pointer flex-col rounded-2xl border p-3 transition-all duration-150
                  ${isActive 
                    ? 'border-[var(--accent)]/20 bg-[var(--accent)]/10 shadow-[var(--shadow-sm)]' 
                    : 'border-transparent hover:bg-[var(--bg-hover)] active:bg-[var(--bg-surface)]'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`truncate text-sm font-semibold ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                    {thread.subject || `Thread ${thread.id.slice(0, 6)}`}
                  </span>
                  <span className={`flex-shrink-0 text-xs font-medium ${thread.unread ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                    {thread.lastMessageTime || '---'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block truncate text-xs text-[var(--text-muted)] line-clamp-1">
                    {thread.snippet || "No preview available..."}
                  </span>
                  {thread.unread && (
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)]"></div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
