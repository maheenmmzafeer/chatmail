export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="w-full px-2 py-1 rounded border"
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
