"use client";
import { useState, useEffect } from 'react';
import { SearchIcon } from './icons';

interface Contact {
  id: string;
  email: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
}

interface ThreadSummary {
  id: string;
  subject: string;
  snippet: string;
  lastMessageTime: string;
  unread: boolean;
  contactName: string;
  contactEmail: string;
}

interface ContactsListProps {
  onSelect?: (id: string) => void;
  selectedId?: string;
}

export default function ContactsList({ onSelect, selectedId }: ContactsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  const formatRelativeTime = (timestamp: string) => {
    const value = Number(timestamp);
    if (!value) return 'Unknown';
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
        const threads: ThreadSummary[] = data?.threads || [];
        const grouped = new Map<string, Contact>();

        threads.forEach((thread) => {
          const contactKey = thread.contactEmail || `unknown-${thread.id}`;
          const existing = grouped.get(contactKey);
          const unreadCount = thread.unread ? 1 : 0;

          if (!existing) {
            grouped.set(contactKey, {
              id: contactKey,
              email: thread.contactEmail,
              name: thread.contactName || thread.contactEmail || 'Unknown Sender',
              lastMessage: thread.snippet || thread.subject || 'No preview available',
              time: formatRelativeTime(thread.lastMessageTime),
              unread: unreadCount,
            });
            return;
          }

          existing.unread = (existing.unread || 0) + unreadCount;
        });

        setContacts(Array.from(grouped.values()));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading contacts:', err);
        setLoading(false);
      });
  }, []);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvatarColor = (index: number) => {
    const colors = ['from-blue-500 to-blue-600', 'from-purple-500 to-purple-600', 'from-pink-500 to-pink-600', 'from-indigo-500 to-indigo-600', 'from-cyan-500 to-cyan-600'];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="mb-4 px-2">
        <div className="flex items-center gap-2 bg-[var(--bg-input)] rounded-full px-4 py-2.5 border border-[var(--border)] focus-within:border-[#00a884] focus-within:ring-1 focus-within:ring-[#00a884]/20 transition-all">
          <SearchIcon className="text-[#8696a0] w-4 h-4 flex-shrink-0" />
          <input 
            className="flex-1 bg-transparent text-sm text-[#e9edef] placeholder-[#8696a0] focus:outline-none"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pr-1.5 pb-4 space-y-1.5 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 animate-pulse">
            <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[#00a884] rounded-full animate-spin"></div>
            <span className="text-[#8696a0] text-xs font-medium tracking-wider">LOADING</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-[#8696a0] text-center py-12 text-sm font-medium px-4">
            {searchTerm ? `No contacts match "${searchTerm}"` : 'No contacts found.'}
          </div>
        ) : (
          filteredContacts.map((contact, index) => {
            const isSelected = selectedId === contact.id;
            return (
              <div 
                key={contact.id} 
                onClick={() => onSelect && onSelect(contact.id)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150
                  ${isSelected 
                    ? 'bg-[var(--accent)]/10 border border-[var(--accent)]/30 shadow-sm' 
                    : 'hover:bg-[var(--bg-hover)] border border-transparent active:bg-[var(--bg-surface)]'
                  }
                `}
              >
                {/* Avatar */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0
                  bg-gradient-to-br ${isSelected ? 'from-[#00a884] to-[#008069]' : getAvatarColor(index)}
                `}>
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                
                {/* Contact Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-semibold truncate text-sm ${isSelected ? 'text-[#00a884]' : 'text-[#e9edef]'}`}>
                      {contact.name}
                    </span>
                    <span className={`text-xs flex-shrink-0 font-medium ${contact.unread ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#8696a0] truncate block line-clamp-1">
                      {contact.lastMessage}
                    </span>
                    {(contact.unread ?? 0) > 0 && (
                      <span className="bg-[#00a884] text-[var(--bg)] text-[10px] font-bold px-2 py-0.5 rounded-full min-w-fit flex-shrink-0 shadow-sm">
                        {(contact.unread ?? 0) > 99 ? '99+' : contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-3 border-t border-[var(--border)] mt-auto">
        <div className="flex items-center gap-2 text-xs text-[#8696a0] px-3">
          <div className="w-2 h-2 bg-[#00a884] rounded-full animate-pulse"></div>
          <span>Connected to Gmail</span>
        </div>
      </div>
    </div>
  );
}
