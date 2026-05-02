import { useState } from 'react';

export default function ComposeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">New Email</h2>
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="To"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
        <textarea
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="Message body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-blue-600 text-white">Send</button>
        </div>
      </div>
    </div>
  );
}
