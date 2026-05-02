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
        <div className="flex items-center gap-2 bg-[var(--bg-input)] rounded-full px-4 py-2.5 border border-[var(--border)] focus-within:border-[#00a884] focus-within:ring-1 focus-within:ring-[#00a884]/20 transition-all">
          <SearchIcon className="text-[#8696a0] w-4 h-4 flex-shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm text-[#e9edef] placeholder-[#8696a0] focus:outline-none"
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
            <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[#00a884] rounded-full animate-spin"></div>
            <span className="text-[#8696a0] text-xs font-semibold tracking-wider">LOADING</span>
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="text-[#8696a0] text-center py-12 text-sm font-medium px-4">
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
                  flex flex-col p-3 rounded-lg cursor-pointer transition-all duration-150
                  ${isActive 
                    ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30 shadow-sm' 
                    : 'hover:bg-[var(--bg-hover)] border border-transparent active:bg-[var(--bg-surface)]'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-sm truncate font-semibold ${isActive ? 'text-[#00a884]' : 'text-[#e9edef]'}`}>
                    {thread.subject || `Thread ${thread.id.slice(0, 6)}`}
                  </span>
                  <span className={`text-xs flex-shrink-0 font-medium ${thread.unread ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>
                    {thread.lastMessageTime || '---'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8696a0] truncate block line-clamp-1">
                    {thread.snippet || "No preview available..."}
                  </span>
                  {thread.unread && (
                    <div className="w-2 h-2 bg-[#00a884] rounded-full flex-shrink-0"></div>
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
