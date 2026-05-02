import { useState } from 'react';

export default function ReplyInput({ onSend }: { onSend: (msg: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <form
      className="flex gap-2"
      onSubmit={e => {
        e.preventDefault();
        if (value.trim()) {
          onSend(value);
          setValue('');
        }
      }}
    >
      <input
        className="flex-1 px-3 py-2 rounded border"
        placeholder="Type a reply..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Send</button>
    </form>
  );
}
