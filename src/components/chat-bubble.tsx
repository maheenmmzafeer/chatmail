"use client";
import DOMPurify from 'dompurify';

interface ChatBubbleProps {
  message: string;
  sender: 'me' | 'them';
  name: string;
  timestamp: string;
  cc?: string[];
  bcc?: string[];
  attachments?: { filename: string; url: string }[];
}

function formatTime(ts: string | number): string {
  if (!ts) return '';
  try {
    const ms = typeof ts === 'string' ? parseInt(ts) : ts;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return typeof ts === 'string' ? ts : '';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function ChatBubble({ 
  message, 
  sender, 
  name, 
  timestamp, 
  cc, 
  bcc, 
  attachments 
}: ChatBubbleProps) {
  const safeHtml = DOMPurify.sanitize(message, { 
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'target']
  });
  const isMe = sender === 'me';
  const displayName = name?.split('<')[0].trim() || 'Unknown';

  return (
    <div className={`flex w-full mb-4 animate-slide-in-${isMe ? 'right' : 'left'} ${isMe ? 'justify-end pl-12 sm:pl-24' : 'justify-start pr-12 sm:pr-24'}`}>
      <div className="relative group max-w-[80%] md:max-w-[60%] lg:max-w-[50%]">
        
        {/* Bubble body */}
        <div
          className={`relative shadow-sm overflow-hidden transition-all duration-200 ${
            isMe
              ? 'bg-[var(--sent-bg)] rounded-[18px] rounded-tr-sm text-[var(--sent-text)]'
              : 'bg-[var(--received-bg)] rounded-[18px] rounded-tl-sm text-[var(--received-text)] border border-[var(--border)]'
          }`}
        >
          {/* Sender name (only for received) */}
          {!isMe && (
            <div className="px-3 pt-2 pb-0.5 text-[12px] font-600 text-[#00a884] truncate tracking-wide">
              {displayName}
            </div>
          )}

          {/* Message body */}
          <div className={`px-4 ${!isMe ? 'pt-0.5' : 'pt-2'} pb-2`}>
            <div
              className={`text-[15px] leading-relaxed break-words font-normal
                [&_a]:font-medium [&_a]:underline-offset-4 [&_a]:underline 
                [&_p]:mb-1 last:[&_p]:mb-0 
                [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:my-2
                [&_ol]:pl-5 [&_ol]:list-decimal [&_ol]:my-2
                ${isMe ? '[&_a]:text-blue-200 hover:[&_a]:text-blue-100' : '[&_a]:text-blue-400 hover:[&_a]:text-blue-300'}`}
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </div>

          {/* CC / BCC tags */}
          {(cc?.length || bcc?.length) ? (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {cc?.map(c => (
                <span key={c} className="text-[10px] bg-black/20 rounded-md px-2 py-1 font-medium">CC: {c}</span>
              ))}
              {bcc?.map(b => (
                <span key={b} className="text-[10px] bg-black/20 rounded-md px-2 py-1 font-medium">BCC: {b}</span>
              ))}
            </div>
          ) : null}

          {/* Attachments */}
          {attachments && attachments.length > 0 && (
            <div className="px-4 pb-2 space-y-2">
              {attachments.map(att => (
                <a
                  key={att.filename}
                  href={att.url}
                  download
                  className={`flex items-center gap-3 transition rounded-lg px-3 py-2.5 text-sm backdrop-blur-sm
                    ${isMe ? 'bg-black/10 hover:bg-black/20 text-[var(--sent-text)]' : 'bg-[var(--bg-panel)] hover:bg-black/20 text-[var(--received-text)]'}
                  `}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="opacity-80 flex-shrink-0">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                  </svg>
                  <span className="truncate max-w-xs font-medium">{att.filename}</span>
                </a>
              ))}
            </div>
          )}

          {/* Timestamp + read receipt row */}
          <div className="flex items-center justify-end gap-2 px-4 pb-2 pt-1">
            <span className={`text-[11px] font-medium tracking-wide ${isMe ? 'text-white/60' : 'text-[#8696a0]'}`}>
              {formatTime(timestamp)}
            </span>
            {isMe && (
              <svg viewBox="0 0 16 11" width="14" height="11" fill="currentColor" className="text-[#31a24c] flex-shrink-0">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.032l6.273-8.03a.366.366 0 0 0-.06-.514zm-5.108 0l-.477-.372a.365.365 0 0 0-.51.063L3.559 9.88a.32.32 0 0 1-.485.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.032l6.273-8.03a.366.366 0 0 0-.06-.514z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
